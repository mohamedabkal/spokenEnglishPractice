import { createConfig } from '@gluestack-style/react';
import { config as defaultConfig } from './config/gluestack-ui.config';

export default createConfig({
  ...defaultConfig,
   tokens: {
     ...defaultConfig.tokens,
     colors: {
       ...defaultConfig.tokens.colors,
       primary_alpha_0: '#5CB35E',
       primary_alpha_10: '#5CB35EA0'
     },
   },

   components: {
    ...defaultConfig.components,
    Button: {
      ...defaultConfig.components.Button,
      theme: {
        ...defaultConfig.components.Button.theme,
        variants: {
          ...defaultConfig.components.Button.theme.variants,
          variant: {
            ...defaultConfig.components.Button.theme.variants.variant,
             primary: {
               'bg': '$primary_alpha_0',
               minHeight: 52,
               maxHeight: 52,
               borderRadius: 99,
               '_text': {
                 color: 'white',
               },
               ':active': {
                 '_text': {
                   color: 'white',
                 },
                 bg: '$primary_alpha_10',
             },
            },
            secondary: {
             borderColor: '$primary_alpha_0',
             'bg': 'transparent',
             minHeight: 52,
             maxHeight: 52,
             borderWidth: 2,
             borderRadius: 99,
             '_text': {
               color: '$primary_alpha_0',
             },
             ':active': {
                '_text': {
                  color: '$primary_alpha_0',
                },
                borderColor: '$primary_alpha_10',
                'bg': 'transparent',
            },
           },
          },
        },
      },
      componentConfig: {
        descendantStyle: ['_text'],
      },
    },

    Input: {
      ...defaultConfig.components.Input,
     theme: {
      ...defaultConfig.components.Input.theme,
       variants: {
        ...defaultConfig.components.Input.theme.variants,
         variant: {
          ...defaultConfig.components.Input.theme.variants.variant,
            primary: {
             borderWidth: 2,
             borderRadius: 99,
             minHeight: 52,
             maxHeight: 52,
             '_text': {
                color: 'white',
             },
             ':focus': {
                '_text': {
                  color: 'white',
                },
                bg: 'transparent',
                borderColor: '$primary_alpha_0',
            },
           },
           secondary: {
            borderColor: '$primary_alpha_0',
            'bg': 'transparent',
            borderWidth: 2,
            borderRadius: 99,
            '_text': {
              color: '$primary_alpha_0',
            },
            ':active': {
               '_text': {
                 color: '$primary_alpha_0',
               },
               borderColor: '$primary_alpha_10',
               'bg': 'transparent',
           },
          },
         },
       },
     },
     componentConfig: {
       descendantStyle: ['_text'],
     },
   },

   SelectTrigger: {
    ...defaultConfig.components.SelectTrigger,
     theme: {
      ...defaultConfig.components.SelectTrigger.theme,
       variants: {
        ...defaultConfig.components.SelectTrigger.theme.variants,
         variant: {
          ...defaultConfig.components.SelectTrigger.theme.variants.variant,
            primary: {
             borderWidth: 2,
             borderRadius: 99,
             minHeight: 52,
             maxHeight: 52,
             '_text': {
                color: 'white',
             },
             ':focus': {
                '_text': {
                  color: 'white',
                },
                bg: 'transparent',
                borderColor: '$primary_alpha_0',
            },
           },
         },
       },
     },
     componentConfig: {
       descendantStyle: ['_text'],
     },
   },
  },
});
