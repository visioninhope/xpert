import { CdkMenuModule } from '@angular/cdk/menu'
import { CommonModule } from '@angular/common'
import { Component, computed, inject, input } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { ThemesEnum } from '@metad/ocap-angular/core'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { injectHelpWebsite, IUser, LANGUAGES, LanguagesMap, Store } from '../../../@core'
import { UserPipe } from '../../../@shared/pipes'
import { UserProfileInlineComponent } from '../../../@shared/user'
import { AppService } from '../../../app.service'
import { OverlayAnimation1 } from '@metad/core'
import { I18nService } from '@cloud/app/@shared/i18n'

const THEMES = [
  {
    key: 'system',
    caption: 'System',
    icon: 'settings_suggest'
  },
  {
    key: 'light',
    caption: 'Light',
    icon: 'light_mode'
  },
  {
    key: 'dark',
    caption: 'Dark',
    icon: 'dark_mode'
  },
  {
    key: 'dark-green',
    caption: 'Dark Green',
    icon: 'dark_mode'
  }
]

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, CdkMenuModule, TranslateModule, UserPipe, UserProfileInlineComponent],
  selector: 'pac-header-user',
  templateUrl: './user.component.html',
  animations: [OverlayAnimation1]
})
export class HeaderUserComponent {
  languages = LANGUAGES
  ThemesEnum = ThemesEnum

  readonly store = inject(Store)
  readonly appService = inject(AppService)
  readonly router = inject(Router)
  readonly #i18n = inject(I18nService)
  readonly helpWebsite = injectHelpWebsite()

  // Inputs
  readonly user = input<IUser>()

  // States
  readonly preferredTheme$ = toSignal(this.store.preferredTheme$)
  readonly preferredThemeIcon$ = computed(() => THEMES.find((item) => item.key === this.preferredTheme$())?.icon)

  readonly userSignal = toSignal(this.store.user$)
  readonly language$ = toSignal(this.appService.preferredLanguage$)

  readonly themesT$ = toSignal(this.#i18n.stream('PAC.Themes'))

  readonly themeOptions$ = computed(() => {
    const translate = this.themesT$()
    return THEMES.map((item) => ({
      ...item,
      caption: translate[item.caption] ?? item.caption
    }))
  })

  readonly langLabel = computed(() => LANGUAGES.find((_) => _.value === this.language$())?.label)
  readonly themeLabel = computed(
    () => this.themeOptions$().find((_) => _.key === (this.preferredTheme$() ?? ThemesEnum.system))?.caption
  )

  readonly firstLetter = computed(() => new UserPipe().transform(this.user())?.[0].toUpperCase())


  onLanguageSelect(language: string): void {
    this.#i18n.changeLanguage(language)
  }
  onThemeSelect(mode: string): void {
    this.store.preferredTheme = mode
  }
  onProfile() {
    this.router.navigate(['/settings/account'])
  }
  onLogoutClick(): void {
    this.router.navigate(['/auth/logout'])
  }
}
