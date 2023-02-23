module.exports = {
    request: (body, params, query) => {
        return {body, params, query}
    },
    response: () => {
        const res = {}
        res.status = jest.fn().mockReturnValue(res)
        res.json = (res) => res
        return res
    }
}

