/* produtoController.js
   Sessões:
   1) Imports
   2) Controller actions: list, create, update, remove, search

   Responsabilidade: lógica HTTP + uso do model Produto.
*/

// 1) Imports
const Produto = require('../models/produtoModel');

// 2) Controller
const ProdutoController = {
  // listar todos os produtos
  async list(req,res){
    try{
      const produtos = await Produto.findAll();
      res.json(produtos);
    }catch(err){
      console.error(err);
      res.status(500).json({error:'Erro ao listar produtos'});
    }
  },

  // criar produto
  async create(req,res){
    try{
      const body = req.body;
      if(!body.nome_produto) return res.status(400).json({error:'nome_produto obrigatório'});
      const novo = await Produto.create(body);
      res.status(201).json(novo);
    }catch(err){
      console.error(err);
      res.status(500).json({error:'Erro ao criar produto'});
    }
  },

  // atualizar produto (parcial)
  async update(req,res){
    try{
      const id = req.params.id;
      const body = req.body;
      const updated = await Produto.update(id, body);
      res.json(updated);
    }catch(err){
      console.error(err);
      res.status(500).json({error:'Erro ao atualizar produto'});
    }
  },

  // remover produto
  async remove(req,res){
    try{
      const id = req.params.id;
      await Produto.remove(id);
      res.json({ok:true});
    }catch(err){
      console.error(err);
      res.status(500).json({error:'Erro ao excluir produto'});
    }
  },

  // buscar produto por nome (retorna até 3 menores preços e mensagem de economia)
  async search(req,res){
    try{
      const nome = req.params.nome;
      const results = await Produto.searchByName(nome);
      if(results.length===0) return res.json({results:[],message:null});
      const precos = results.map(r=>Number(r.preco));
      const menor = Math.min(...precos);
      const maior = Math.max(...precos);
      const economia = (maior - menor);
      const message = `Você pode economizar R$ ${economia.toFixed(2).replace('.',',')} comprando no mercado mais barato.`;
      res.json({results,message});
    }catch(err){
      console.error(err);
      res.status(500).json({error:'Erro na busca'});
    }
  }
}

module.exports = ProdutoController;
