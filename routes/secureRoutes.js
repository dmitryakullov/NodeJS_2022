const express = require('express');
const { UsersDb, TodolistDb } = require('../db');

const router = express.Router();

router.get('/profile', (req, res, next) => {
  UsersDb.findOne({ _id: req.user['_id'] }, (err, user) => {
    if (err) {
      return next(new Error('An error occurred!'));
    }
    delete user.password;

    res.json({
      message: 'Ok',
      entity: user,
    });
  });
});

router.put('/profile', (req, res, next) => {
  const { firstName, lastName } = req.body;

  if (typeof firstName !== 'string') {
    return next(new Error("Request doesn't has correct firstName parameter"));
  }
  if (typeof lastName !== 'string') {
    return next(new Error("Request doesn't has correct lastName parameter"));
  }

  UsersDb.update({ _id: req.user['_id'] }, { $set: { firstName, lastName } }, {}, (err, num) => {
    if (err || !num) {
      return next(new Error('An error occurred!'));
    }

    res.json({
      message: 'Ok',
    });
  });
});

router.delete('/profile', (req, res, next) => {
  UsersDb.remove({ _id: req.user['_id'] }, (err) => {
    if (err) {
      return next(new Error('An error occurred!'));
    }

    res.json({
      message: 'Ok',
    });
  });
});

router.get('/todo-list', (req, res, next) => {
  TodolistDb.find({ userId: req.user['_id'] }, (err, todoList) => {
    if (err) {
      return next(new Error('An error occurred!'));
    }

    res.json({
      message: 'Ok',
      entity: todoList,
    });
  });
});

router.post('/todo-list', (req, res, next) => {
  const userId = req.user['_id'];

  const { title } = req.body;
  if (!title) {
    return next(new Error("Request doesn't has correct title parameter"));
  }

  TodolistDb.insert({ userId, title: req.body.title, isDone: false }, (err) => {
    if (err) {
      return next(new Error('An error occurred!'));
    }

    res.json({
      message: 'Ok',
    });
  });
});

router.delete('/todo-list', (req, res, next) => {
  const userId = req.user['_id'];

  const { todoId } = req.body;
  if (!todoId) {
    return next(new Error("Request doesn't has correct todoId parameter"));
  }

  TodolistDb.remove({ userId, _id: todoId }, (err) => {
    if (err) {
      return next(new Error('An error occurred!'));
    }

    res.json({
      message: 'Ok',
    });
  });
});

router.put('/todo-list/edit-is-done', (req, res, next) => {
  const userId = req.user['_id'];

  const { todoId, isDone } = req.body;
  if (!todoId) {
    return next(new Error("Request doesn't has correct todoId parameter"));
  }
  if (typeof isDone !== 'boolean') {
    return next(new Error("Request doesn't has correct isDone parameter"));
  }

  TodolistDb.update({ _id: todoId, userId }, { $set: { isDone } }, {}, (err, num) => {
    if (err || !num) {
      return next(new Error('An error occurred!'));
    }

    res.json({
      message: 'Ok',
    });
  });
});

router.put('/todo-list/edit-title', (req, res, next) => {
  const userId = req.user['_id'];

  const { todoId, title } = req.body;
  if (!todoId) {
    return next(new Error("Request doesn't has correct todoId parameter"));
  }
  if (typeof title !== 'string') {
    return next(new Error("Request doesn't has correct title parameter"));
  }

  if (title === '') {
    TodolistDb.remove({ userId, _id: todoId }, (err) => {
      if (err) {
        return next(new Error('An error occurred!'));
      }

      res.json({
        message: 'Ok',
      });
    });
  }

  TodolistDb.update({ _id: todoId, userId }, { $set: { title } }, {}, (err, num) => {
    if (err || !num) {
      return next(new Error('An error occurred!'));
    }

    res.json({
      message: 'Ok',
    });
  });
});

module.exports = router;
