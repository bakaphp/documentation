module.exports = {
  title: "Baka Documentation",
  description: 'Just playing around',
  themeConfig: {
    logo: 'assets/img/baka.png',
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Rapid Crud', link: '/rapid-crud/' },
      { text: 'Example Feature', link: '/example-feature/' }
    ],
    displayAllHeaders: true,
    sidebar: 'auto',
    serviceWorker: {
      updatePopup: true
    },
    docsBranch: 'master',
    editLinks: true,
    editLinkText: 'Help us improve this page!',
    repo: 'bakaphp/documentation',
  }
}
