module.exports = {
    presets: ['@vue/cli-plugin-babel/preset'],
    plugins: ['@babel/plugin-transform-runtime'],
    comments: false,
    overrides: [
        {
            // only process jsx with react style for styleguide components
            include: ['**/styleguide/components/*.{js,vue}'],
            plugins: ['@babel/plugin-transform-react-jsx'],
        },
        {
            // For vue components process jsx with the vue style
            include: ['**/src/components/**/*.jsx'],
            plugins: ['transform-vue-jsx'],
        },
    ],
};
