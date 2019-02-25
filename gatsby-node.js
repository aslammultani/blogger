var path = require('path');

exports.createPages = ({graphql, actions}) => {
    const {createPage} = actions
    const loadBlogs = new Promise ((resolve, reject) => {
        const blogPostTemplate = path.resolve('src/templates/blog-post.js')
        resolve(
            graphql(`
                {
                    allContentfulBlog ( limit: 100 ) {
                        edges {
                            node {
                                id
                                slug
                            }
                        }
                    }
                }
            `).then((result) => {
                if(result.errors) {
                    reject(result.errors)
                }
                result.data.allContentfulBlog.edges.forEach((edge) => {
                    createPage ({
                        path: edge.node.slug,
                        component: blogPostTemplate,
                        context: {
                            slug: edge.node.slug
                        }
                    })
                })
                return
            })
        )
    })


    const loadPages = new Promise((resolve, reject) => {
        resolve(
            graphql(`
              {
                allContentfulPages {
                  edges {
                    node {
                      slug
                    }
                  }
                }
              }
            `).then(result => {
              const pages = result.data.allContentfulPages.edges
              pages.map(({ node }) => {
                createPage({
                  path: `${node.slug}/`,
                  component: path.resolve(`./src/templates/inner-page.js`),
                  context: {
                    slug: node.slug,
                  },
                })
              })
            })
        )
      })
    
  return Promise.all([loadBlogs, loadPages])
}