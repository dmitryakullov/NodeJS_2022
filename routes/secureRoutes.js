const express = require('express');
const { UsersDb, TodoListDb } = require('../db');

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    OkResponse:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *              description: Status message
 *    TodoItem:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        userId:
 *          type: string
 *        title:
 *          type: string
 *        isDone:
 *          type: boolean
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */

/**
 * @swagger
 * /user/profile:
 *  get:
 *    description: User profileDetails
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: message and user details
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Status message
 *                entity:
 *                  type: object
 *                  description: User details
 *                  properties:
 *                    email:
 *                      type: string
 *                    firstName:
 *                      type: string
 *                    lastName:
 *                      type: string
 */

router.get('/profile', (req, res, next) => {
  UsersDb.findOne({ _id: req.user._id }, (err, user) => {
    if (err) {
      return next(new Error('An error occurred!'));
    }
    const { email, firstName, lastName } = user;

    res.json({
      message: 'Ok',
      entity: {
        email,
        firstName,
        lastName,
      },
    });
  });
});

/**
 * @swagger
 * /user/profile:
 *  put:
 *    description: Edit first name and last name
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *            example:
 *              firstName: Tom
 *              lastName: Smith
 *    responses:
 *      200:
 *        description: message
 *        content:
 *          $ref: '#/components/schemas/OkResponse'
 */

router.put('/profile', (req, res, next) => {
  const { firstName, lastName } = req.body;

  if (typeof firstName !== 'string') {
    return next(new Error("Request doesn't has correct firstName parameter"));
  }
  if (typeof lastName !== 'string') {
    return next(new Error("Request doesn't has correct lastName parameter"));
  }

  UsersDb.update({ _id: req.user._id }, { $set: { firstName, lastName } }, {}, (err, num) => {
    if (err || !num) {
      return next(new Error('An error occurred!'));
    }

    res.json({
      message: 'Ok',
    });
  });
});

/**
 * @swagger
 * /user/profile:
 *  delete:
 *    description: Delete user profile
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: message
 *        content:
 *          $ref: '#/components/schemas/OkResponse'
 */

router.delete('/profile', (req, res, next) => {
  UsersDb.remove({ _id: req.user._id }, (err) => {
    if (err) {
      return next(new Error('An error occurred!'));
    }

    res.json({
      message: 'Ok',
    });
  });
});

/**
 * @swagger
 * /user/todo-list:
 *  get:
 *    description: Get all todo list
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: message
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Status message
 *                entity:
 *                  type: array
 *                  description: todo list
 *                  items:
 *                    $ref: '#/components/schemas/TodoItem'
 */

router.get('/todo-list', (req, res, next) => {
  TodoListDb.find({ userId: req.user._id }, (err, todoList) => {
    if (err) {
      return next(new Error('An error occurred!'));
    }

    res.json({
      message: 'Ok',
      entity: todoList,
    });
  });
});

/**
 * @swagger
 * /user/todo-list:
 *  post:
 *    description: Create new todo item
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *            example:
 *              title: New todo.
 *    responses:
 *      200:
 *        description: message
 *        content:
 *          $ref: '#/components/schemas/OkResponse'
 */

router.post('/todo-list', (req, res, next) => {
  const userId = req.user._id;

  const { title } = req.body;
  if (!title) {
    return next(new Error("Request doesn't has correct title parameter"));
  }

  TodoListDb.insert({ userId, title: req.body.title, isDone: false }, (err) => {
    if (err) {
      return next(new Error('An error occurred!'));
    }

    res.json({
      message: 'Ok',
    });
  });
});

/**
 * @swagger
 * /user/todo-list:
 *  delete:
 *    description: Delete todo item
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              todoId:
 *                type: string
 *            example:
 *              todoId: '{todoId}'
 *    responses:
 *      200:
 *        description: message
 *        content:
 *          $ref: '#/components/schemas/OkResponse'
 */

router.delete('/todo-list', (req, res, next) => {
  const userId = req.user._id;

  const { todoId } = req.body;
  if (!todoId) {
    return next(new Error("Request doesn't has correct todoId parameter"));
  }

  TodoListDb.remove({ userId, _id: todoId }, (err) => {
    if (err) {
      return next(new Error('An error occurred!'));
    }

    res.json({
      message: 'Ok',
    });
  });
});

/**
 * @swagger
 * /user/todo-list/edit-is-done:
 *  put:
 *    description: Set todo status
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              todoId:
 *                type: string
 *              isDone:
 *                type: boolean
 *            example:
 *              todoId: '{todoId}'
 *              isDone: true
 *    responses:
 *      200:
 *        description: message
 *        content:
 *          $ref: '#/components/schemas/OkResponse'
 */

router.put('/todo-list/edit-is-done', (req, res, next) => {
  const userId = req.user._id;

  const { todoId, isDone } = req.body;
  if (!todoId) {
    return next(new Error("Request doesn't has correct todoId parameter"));
  }
  if (typeof isDone !== 'boolean') {
    return next(new Error("Request doesn't has correct isDone parameter"));
  }

  TodoListDb.update({ _id: todoId, userId }, { $set: { isDone } }, {}, (err, num) => {
    if (err || !num) {
      return next(new Error('An error occurred!'));
    }

    res.json({
      message: 'Ok',
    });
  });
});

/**
 * @swagger
 * /user/todo-list/edit-title:
 *  post:
 *    description: Set todo status
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              todoId:
 *                type: string
 *              title:
 *                type: string
 *            example:
 *              todoId: '{todoId}'
 *              title: New todo title
 *    responses:
 *      200:
 *        description: message
 *        content:
 *          $ref: '#/components/schemas/OkResponse'
 */

router.post('/todo-list/edit-title', (req, res, next) => {
  const userId = req.user._id;

  const { todoId, title } = req.body;
  if (!todoId) {
    return next(new Error("Request doesn't has correct todoId parameter"));
  }
  if (typeof title !== 'string') {
    return next(new Error("Request doesn't has correct title parameter"));
  }

  if (title === '') {
    TodoListDb.remove({ userId, _id: todoId }, (err) => {
      if (err) {
        return next(new Error('An error occurred!'));
      }

      res.json({
        message: 'Ok',
      });
    });
  }

  TodoListDb.update({ _id: todoId, userId }, { $set: { title } }, {}, (err, num) => {
    if (err || !num) {
      return next(new Error('An error occurred!'));
    }

    res.json({
      message: 'Ok',
    });
  });
});

module.exports = router;
