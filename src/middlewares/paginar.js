import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

const paginar = async (req, res, next) => {
  try{
    const listToPaginate = req.listToPaginate;

    let { page = 1, size = 5 , campoOrdenacao = "_id", ordem = -1} = req.query;
    page = Number(page);
    size = Number(size);
    ordem = Number(ordem);
  
    if(page > 0 && size > 0){
      const resultList = await listToPaginate.find()
        .sort({ [campoOrdenacao]: ordem })
        .skip((page - 1) * size).limit(size)
        .exec();
      res.status(200).json(resultList);
    }else{
      next(new RequisicaoIncorreta());
    }
  }catch(erro){
    next(erro);
  }
};

export default paginar;