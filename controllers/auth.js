import models from '../models/index';
import bcrypt from 'bcrypt';
import uuid from 'uuid/v4';
import jwt from 'jsonwebtoken';

const controller = {
    create: (req, res) => {
        return models.user
            .create({
                id: uuid(),
                email: req.body.email,
                login: req.body.login,
                password: bcrypt.hashSync(req.body.password, 10),
            })
            .then((user) => res.status(201).json({
                id: user.id,
                email: user.email,
                login: user.login,
            }))
            .catch((error) => res.status(400).json({ message: "Wrong email/password"}));
    },


    authenticate: (req, res) => {
        models.user.findOne({ where: { login: req.body.login } }).then(user => {
            if (!user) {
                return res.status(404).json({ message: "Invalid username/password" });
            }
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const token = jwt.sign({ id: user.id }, req.app.get('secretKey'), { expiresIn: '1h' });
                return res.status(200).json({
                    user: {
                        id: user.id,
                        email: user.email,
                        login: user.login,
                    },
                    token: token
                });
            }
            return res.status(400).json({
                message: "Invalid username/password"
            });

        });
    }
};

export default controller;