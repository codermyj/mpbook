// const http = require('http')
const fly = require('flyio')
const {mysql} = require('../qcloud')
// 新增图书
// 1、获取接口信息 http://isbn.szmesoft.com/isbn/query?isbn=ISBN码
// 2、图书入库
module.exports = async (ctx) => {
    const {isbn, openid} = ctx.request.body
    if (isbn && openid) {
        const findBook = await mysql('books').select().where('isbn', isbn)
        if (findBook.length) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '您已添加过该图书',
                    findBook: !findBook
                }
            }
            return
        }
        let url = `http://isbn.szmesoft.com/isbn/query?isbn=${isbn}`
        console.log(url)
        const bookInfo = await getJSON(url)
        const {ISBN, BookName, Author, Publishing, Pages, Price} = bookInfo
        const PhotoUrl = `http://isbn.szmesoft.com/ISBN/GetBookPhoto?ID=${bookInfo.PhotoUrl}`
        console.log({
            ISBN, BookName, Author, Publishing, Pages, Price, PhotoUrl
        })
        try {
            await mysql('books').insert({
                isbn: ISBN,
                openid,
                title: BookName,
                image: PhotoUrl,
                author: Author,
                publisher: Publishing,
                pages: Pages,
                price: Price
            })
            ctx.state.data = {
                title: BookName,
                msg: 'success'
            }
        } catch (e) {
            ctx.state = {
                code: -1,
                data: {
                    msg: `新增失败${e}`
                }
            }
        }
    }
}

// function getJSON (url) {
//     return new Promise((resolve, reject) => {
//         http.get(url, res => {
//             // eslint-disable-next-line no-unused-vars
//             let urlData = ''
//             res.on('data', data => {
//                 urlData += data
//             })
//             res.on('end', data => {
//                 const bookInfo = JSON.parse(urlData)
//                 if (bookInfo.BookName) {
//                     resolve(bookInfo)
//                 }
//                 reject(bookInfo)
//             })
//         })
//     })
// }
function getJSON (url) {
    return fly.get(url).then((res) => {
        return res.data
    })
}
