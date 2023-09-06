import { config, createConfig } from "@gluestack-ui/themed"

export const themeConfig = createConfig({
    ...config.theme,
    components: {
        Button: {
          // write same component name which is passed in styled
          theme: {
            bg: "$indigo.800",
            variants: {
              variant: {
                secondary: {
                  bg: "$indigo.900",
                },
              },
            },
          },
        },
    },
})

