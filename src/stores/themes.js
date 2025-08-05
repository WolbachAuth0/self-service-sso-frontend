import { defineStore } from 'pinia'

const useThemeStore = defineStore('theme', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      themeName: 'Sandstone',
      colorMode: 'dark',
      variant: 'primary',
      themes: [
        { name: 'Brite', colorMode: 'light', variant: 'primary' },
        { name: 'Cerulean', colorMode: 'dark', variant: 'primary'  },
        { name: 'Cosmo', colorMode: 'dark', variant: 'primary'  },
        { name: 'Cyborg', colorMode: 'dark', variant: 'primary'  },
        { name: 'Darkly', colorMode: 'dark', variant: 'primary'  },
        { name: 'Flatly', colorMode: 'dark', variant: 'primary'  },
        { name: 'Journal', colorMode: 'dark', variant: 'primary'  },
        { name: 'Litera', colorMode: 'dark', variant: 'primary'  },
        { name: 'Lumen', colorMode: 'dark', variant: 'primary'  },
        { name: 'Lux', colorMode: 'dark', variant: 'primary'  },
        { name: 'Materia', colorMode: 'light', variant: 'light'  },
        { name: 'Minty', colorMode: 'dark', variant: 'dark'  },
        { name: 'Morph', colorMode: 'dark', variant: 'primary'  },
        { name: 'Pulse', colorMode: 'dark', variant: 'primary'  },
        // { name: 'Quartz', colorMode: 'dark', variant: 'primary'  },
        { name: 'Sandstone', colorMode: 'dark', variant: 'primary'  },
        { name: 'Simplex', colorMode: 'dark', variant: 'primary'  },
        { name: 'Sketchy', colorMode: 'dark', variant: 'primary'  },
        { name: 'Slate', colorMode: 'dark', variant: 'primary'  },
        { name: 'Solar', colorMode: 'dark', variant: 'primary'  },
        { name: 'Spacelab', colorMode: 'dark', variant: 'primary'  },
        { name: 'Superhero', colorMode: 'dark', variant: 'primary'  },
        { name: 'United', colorMode: 'dark', variant: 'primary'  },
        { name: 'Vapor', colorMode: 'dark', variant: 'primary'  },
        { name: 'Yeti', colorMode: 'dark', variant: 'primary'  },
        { name: 'Zephyr', colorMode: 'dark', variant: 'primary'  },
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
    setTheme ({ name, colorMode, variant }) {
      this.themeName = name;
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