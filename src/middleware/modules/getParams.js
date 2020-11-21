const capitalize = require('capitalize')

// Cria o array de parâmetros para ser usado na filtragem e ordenação
const getParams = async (req, res, next) => {
    
    req.params.filters = await getFilters(req.query)

    req.params.options = await getOptions(req.query)

    next()
}

// Constrói o array de filtros de acordo com os parâmetros recebidos
const getFilters = (rawParams) => {
    
    const params = {}
    return new Promise((resolve, reject) => {
        // Filtro de prioridade discretizada
        if(rawParams.priority)
            params.Priority = capitalize(rawParams.priority)
        
        // Filtro de intervalo de data de criação
        if(rawParams.created_from){
            params.DateCreate = {
                ...params.DateCreate,
                $gte: new Date(rawParams.created_from)
            }
        }

        if(rawParams.created_to){
            params.DateCreate = {
                ...params.DateCreate,
                $lte: new Date(rawParams.created_to).setUTCHours(23,59,59)
            }
        }

        // Filtro de intervalo data de atualização
        if(rawParams.updated_from){
            params.DateUpdate = {
                ...params.DateUpdate,
                $gte: new Date(rawParams.updated_from)
            }
        }

        if(rawParams.updated_to){
            params.DateUpdate = {
                ...params.DateUpdate,
                $lte: new Date(rawParams.updated_to).setUTCHours(23,59,59)
            }
        }

        resolve(params)
    })
}

// Constrói o array de opções, responsável pela paginação e ordenação
const getOptions = (rawParams) => {

    return new Promise(async (resolve, reject) => {
        const params = await getPagination(rawParams)
        params.sort = await getSort(rawParams)
        resolve(params)
    })
    
}

// Constrói o array de configuração de paginação
const getPagination = (rawParams) => {
    
    const params = {}
    return new Promise((resolve, reject) => {
         if(rawParams.limit)
            params.limit = parseInt(rawParams.limit)
        
        if(rawParams.skip)
            params.skip = parseInt(rawParams.skip) * parseInt(rawParams.limit)
        
        resolve(params)
    })

}

// Constrói o array de configuração de ordenação
const getSort = (rawParams) => {
    
    const params = {}
    return new Promise((resolve, reject) => {
        if(rawParams.sort_by_priority)
            params.Priority = rawParams.sort_by_priority === 'asc' ? 1:-1
        
        if(rawParams.sort_by_score)
            params.Score = rawParams.sort_by_score === 'asc' ? 1:-1
        
        if(rawParams.sort_by_created)
            params.DateCreate = rawParams.sort_by_created === 'asc' ? 1:-1

        if(rawParams.sort_by_updated)
            params.DateUpdate = rawParams.sort_by_updated === 'asc' ? 1:-1

        resolve(params)
    })
}

module.exports = getParams