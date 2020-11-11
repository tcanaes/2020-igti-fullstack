//import { db } from '../models/index.js';
import gradeModel from '../models/gradeModel.js';
import { logger } from '../config/logger.js';

const create = async (req, res) => {
  const { name, subject, type, value } = req.body;
  try {
    const newGrade = await gradeModel.create({ name, subject, type, value });
    res.status(200).send({ message: 'Grade inserido com sucesso' });
    logger.info(`POST /grade - ${JSON.stringify(newGrade)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;
  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};
  try {
    const grades = await gradeModel.find(condition);
    res.status(200).json(grades);
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const grade = await gradeModel.findById(id);
    logger.info(`GET /grade - ${id}`);
    res.status(200).json(grade);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;
  const { name, subject, type, value } = req.body;
  console.log({ name, subject, type, value });
  try {
    const grade = await gradeModel.findByIdAndUpdate(id, {
      name,
      subject,
      type,
      value,
    });
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
    res.status(200).json(grade);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    await gradeModel.findByIdAndDelete(id);
    res.status(200).send({ message: `${id} Successfully deleted.` });
    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    await gradeModel.deleteMany();
    res.status(200).send({ message: `Successfully deleted all.` });
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
