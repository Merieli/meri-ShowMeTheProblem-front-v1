const path = require('path');

/** @type import("vue-styleguidist").Config */
module.exports = {
    title: 'Show Me The Problem',
    components: 'src/components/**/*.vue',
    // Para usar tema com CSS:
    jssThemedEditor: false,
    // Arquivo css:
    require: ['./styleguide/vsc-prism.css'],
    // editorConfig: { theme: 'monokai' }, //tema anterior
    editorConfig: { theme: './styleguide/theme.js' },
    // theme: './styleguide/theme.js',
    styles: './styleguide/styles.js',
    // styleguideComponents: {
    //     LogoRenderer: path.join(__dirname, 'styleguide/components/Logo'),
    //     // StyleGuideRenderer: path.join(__dirname, 'styleguide/components/StyleGuide'),
    //     // SectionsRenderer: path.join(__dirname, 'styleguide/components/SectionsRenderer'),
    // },
    ignore: ['**/views/*.vue'], // Não documenta os arquivos da pasta
    simpleEditor: false,
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
                    components: 'src/components/**/+(Base|BaseButton)*.vue',
                },
                {
                    name: 'Componentes Feedbacks:',
                    components: 'src/components/**/Feedback*.vue',
                },
            ],
        },
    ],
    renderRootJsx: path.join(__dirname, 'styleguide/styleguide.root.js'),
    usageMode: 'expand',
    styleguideDir: 'dist-docs',
    ribbon: {
        text: 'Access the Project',
        url: `https://merieli-showmetheproblem-dashboard.netlify.app/`,
    },
    enhancePreviewApp: path.resolve(__dirname, 'styleguide/styleguide.preview.js'),
};
