import { defineStore } from 'pinia'

const useThemeStore = defineStore('theme', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      themeName: 'Sandstone',
      colorMode: 'dark',
      variant: 'primary',
      themes: [
        { themeName: 'Brite', colorMode: 'light', variant: 'primary' },
        { themeName: 'Cerulean', colorMode: 'dark', variant: 'primary'  },
        { themeName: 'Cosmo', colorMode: 'dark', variant: 'primary'  },
        { themeName: 'Cyborg', colorMode: 'dark', variant: 'primary'  },
        { themeName: 'Darkly', colorMode: 'dark', variant: 'primary'  },
        { themeName: 'Flatly', colorMode: 'dark', variant: 'primary'  },
        { themeName: 'Journal', colorMode: 'dark', variant: 'primary'  },
        { themeName: 'Litera', colorMode: 'dark', variant: 'primary'  },
        { themeName: 'Lumen', colorMode: 'dark', variant: 'primary'  },
        { themeName: 'Lux', colorMode: 'dark', variant: 'primary'  },
        { themeName: 'Materia', colorMode: 'light', variant: 'light'  },
        { themeName: 'Minty', colorMode: 'dark', variant: 'dark'  },
        { themeName: 'Morph', colorMode: 'dark', variant: 'primary'  },
        { themeName: 'Pulse', colorMode: 'dark', variant: 'primary'  },
        // { themeName: 'Quartz', colorMode: 'dark', variant: 'primary'  },
        { themeName: 'Sandstone', colorMode: 'dark', variant: 'primary'  },
        { themeName: 'Simplex', colorMode: 'dark', variant: 'primary'  },
        { themeName: 'Sketchy', colorMode: 'dark', variant: 'primary'  },
        { themeName: 'Slate', colorMode: 'dark', variant: 'primary'  },
        { themeName: 'Solar', colorMode: 'dark', variant: 'primary'  },
        { themeName: 'Spacelab', colorMode: 'dark', variant: 'primary'  },
        { themeName: 'Superhero', colorMode: 'dark', variant: 'primary'  },
        { themeName: 'United', colorMode: 'dark', variant: 'primary'  },
        { themeName: 'Vapor', colorMode: 'dark', variant: 'primary'  },
        { themeName: 'Yeti', colorMode: 'dark', variant: 'primary'  },
        { themeName: 'Zephyr', colorMode: 'dark', variant: 'primary'  },
      ]
    }
  },
  getters: {
    theme (state) {
      return {
        name: state.themeName,
        colorMode: state.colorMode,
        variant: state.variant,
      }
    }
  },
  actions: {
    setThemeByName (themeName) {
      const theme = this.themes.find(x => String(x.name).toLowerCase() == String(themeName).toLowerCase())
      if (theme) {
        this.themeName = theme.name,
        this.colorMode = theme.colorMode,
        this.variant = theme.variant
      }
      this.applyTheme();
    },
    setTheme ({ themeName, colorMode, variant }) {
      console.log('set theme from appState')
      console.log({ themeName, colorMode, variant })
      this.themeName = themeName;
      this.colorMode = colorMode;
      this.variant = variant;
      this.applyTheme();
    },
    applyTheme () {
      const themeLink = document.getElementById('theme-css');
      if (themeLink) {
        themeLink.href = `/assets/css/${String(this.themeName).toLowerCase()}/bootstrap.min.css`;
      }
    }
  }
})

export {
  useThemeStore
}