import { CommonModule } from '@angular/common'
import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatSelectModule } from '@angular/material/select'
import { MatTooltipModule } from '@angular/material/tooltip'
import { nonNullable } from '@metad/core'
import { uniqBy } from 'lodash-es'
import { combineLatestWith, filter, from, map, shareReplay, switchMap, tap } from 'rxjs'
import { IOrganization, PermissionsEnum, Store, UsersOrganizationsService } from '../../../@core'
import { NgxPermissionsService } from 'ngx-permissions'
import { OrgAvatarComponent } from '../../../@shared/organization'
import { TranslationBaseComponent } from '../../../@shared/language'
import { TranslateModule } from '@ngx-translate/core'


@Component({
  standalone: true,
  selector: 'pac-organization-selector',
  templateUrl: 'organization-selector.component.html',
  styleUrl: 'organization-selector.component.scss',
  host: {
    class: 'pac-organization-selector'
  },
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    OrgAvatarComponent
  ]
})
export class OrganizationSelectorComponent extends TranslationBaseComponent implements OnInit {
  private readonly store = inject(Store)
  private readonly userOrganizationService = inject(UsersOrganizationsService)
  private readonly permissionsService = inject(NgxPermissionsService)
  private readonly destroyRef = inject(DestroyRef)

  @Input() isCollapsed = false
  
  selectedOrganization: IOrganization

  public readonly organizations$ = this.store.user$
    .pipe(
      filter(nonNullable),
      switchMap(({ id }) =>
        this.userOrganizationService.getAll(
          [
            'organization',
            'organization.contact',
            'organization.featureOrganizations',
            'organization.featureOrganizations.feature'
          ],
          { userId: id }
        )
      )
    )
    .pipe(
      map(({ items }) =>
        uniqBy(
          items.map(({ organization }) => organization),
          (item) => item.id
        )
      ),
      tap((organizations) => {
        if (organizations.length > 0) {
          const defaultOrganization = organizations.find((organization: IOrganization) => organization.isDefault)
          const [firstOrganization] = organizations

          if (this.store.organizationId) {
            const organization = organizations.find(
              (organization: IOrganization) => organization.id === this.store.organizationId
            )
            this.store.selectedOrganization = organization || defaultOrganization || firstOrganization
          } else {
            // set default organization as selected
            this.store.selectedOrganization = defaultOrganization || firstOrganization
            this.store.organizationId = this.store.selectedOrganization.id
          }
        }
      }),
      combineLatestWith(from(this.permissionsService.hasPermission(PermissionsEnum.SUPER_ADMIN_EDIT))),
      map(([organizations, canAllOrgEdit]) => {
        return canAllOrgEdit ? [
              {
                name: this.getTranslation('PAC.KEY_WORDS.Tenant', { Default: 'Tenant' }),
                id: null
              } as IOrganization,
              ...organizations
            ]
          : organizations
      }),
      takeUntilDestroyed(),
      shareReplay(1)
    )

  public readonly canSelectOrg$ = this.organizations$.pipe(map((organizations) => organizations?.length > 1))

  ngOnInit() {
    this.loadSelectedOrganization()
  }

  compareWith(a: IOrganization, b: IOrganization) {
    return a?.id === b?.id
  }

  private loadSelectedOrganization() {
    this.store.selectedOrganization$
      .pipe(
        filter((organization) => !!organization),
        tap((organization: IOrganization) => {
          this.selectedOrganization = organization
          this.store.featureOrganizations = organization.featureOrganizations ?? []
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe()
  }

  /**
   * Toggle another organization
   * 
   * @param organization 
   */
  selectOrganization(organization: IOrganization) {
    if (organization?.id) {
      this.store.selectedOrganization = organization
      this.store.organizationId = organization.id
      this.store.selectedEmployee = null
      // reload page
      window.location.reload();
    } else {
      this.store.selectedOrganization = null
      this.store.organizationId = null
      this.store.selectedEmployee = null
      this.selectedOrganization = {
        name: this.getTranslation('PAC.Header.Organization.AllOrg', { Default: 'All Org' }),
        id: null
      } as IOrganization
    }

    // Reset selected project when organization is changed
    this.store.selectedProject = null
  }
}
