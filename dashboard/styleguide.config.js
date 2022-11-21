const path = require('path');

/** @type import("vue-styleguidist").Config */
module.exports = {
    title: 'Show Me The Problem',
    components: 'src/components/**/*.vue',
    editorConfig: { theme: 'dracula' }, //tema para codigo
    theme: {
        color: {
            link: '#414045',
            linkHover: '#8280F2',
            baseBackground: '#FBFAFF',
            sidebarBackground: '#F8F7FC',
            ribbonBackground: '#997FDB',
            ribbonText: '#fff',
        },
        fontFamily: {
            base: '"Droid Sans", "Helvetica Neue", sans-serif',
        },
        fontSize: {
            base: 15,
            text: 16,
            small: 13,
            h1: 40,
            h2: 32,
            h3: 24,
            h4: 18,
            h5: 16,
            h6: 16,
        },
    },
    simpleEditor: false,
    template: {
        favicon: 'https://s10.aconvert.com/convert/p3r68-cdx67/a9nty-2el3t-001.ico',
    },
    //ignore: ['**/views/*.vue'], // Não documenta os arquivos da pasta
    sections: [
        {
            name: '⬜ Introdução',
            content: 'docs/introduction.md',
        },
        {
            name: '📚 Documentação',
            sections: [
                {
                    name: 'Componentes Geral:',
                    components: 'src/components/**/!(Feedback|Base)*.vue',
                },
                {
                    name: 'Componentes Base:',
                    components: 'src/components/**/+(BaseNotification|BaseButton)*.vue',
                },
                {
                    name: 'Componentes Feedbacks:',
                    components: 'src/components/**/Feedback*.vue',
                },
            ],
        },
    ],
    renderRootJsx: path.join(__dirname, 'styleguide/styleguide.root.js'),
    copyCodeButton: true,
    usageMode: 'expand', //props e metodos expandido
    exampleMode: 'expand', //Exemplo expandido
    styleguideDir: 'dist-docs',
    ribbon: {
        text: 'Access the Project',
        url: `https://merieli-showmetheproblem-dashboard.netlify.app/`,
    },
    enhancePreviewApp: path.resolve(__dirname, 'styleguide/styleguide.preview.js'),
};
