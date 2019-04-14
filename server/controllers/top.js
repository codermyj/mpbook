const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const top = await mysql('books')
    .select('id', 'title', 'image', 'count')
    .orderBy('count', 'desc')
    .limit(12)
    ctx.state.data = {
        list: top
    }
}
