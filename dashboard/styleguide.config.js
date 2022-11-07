const path = require('path');

/** @type import("vue-styleguidist").Config */
module.exports = {
    title: 'Show Me The Problem',
    components: 'src/components/**/*.vue',
    editorConfig: { theme: 'monokai' },
    ignore: ['**/views/*.vue'],
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
    renderRootJsx: path.join(__dirname, 'config/styleguide.root.js'),
    enhancePreviewApp: path.resolve(__dirname, 'config/preview.js'),
    usageMode: 'expand',
    styleguideDir: 'dist-docs',
    ribbon: {
        text: 'Access the Project',
        url: `https://merieli-showmetheproblem-dashboard.netlify.app/`,
    },
};
