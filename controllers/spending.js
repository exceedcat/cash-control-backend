import models from '../models/index';
import uuid from 'uuid/v4';

// todo: check that edit/delete perform the user that has this spending

const controller = {
    create: (req, res) => {
        const { userId } = req.params;
        return models.spending
            .create({
                id: uuid(),
                title: req.body.title,
                amount: req.body.amount,
                date: req.body.date,
            })
            .then(spending => {
                return models.user.findOne({ where: { id: userId } })
                    .then(user => {
                        user.addSpending(spending);
                        res.status(201).json({
                            id: spending.id,
                            title: spending.title,
                            amount: spending.amount,
                            date: spending.date,
                            user: user.id
                        });
                    })
                    .catch(error => res.status(404).json({ message: "User not found" }))
            })
            .catch((error) => res.status(400).json({ message: "Wrong data" }));
    },
    edit: (req, res) => {
        const { spendingId } = req.params;
        const { title, amount, date } = req.body;
        return models.spending
            .findOne({ where: { id: spendingId } })
            .then(spending => {
                spending.update({
                    title: title || spending.title,
                    amount: amount || spending.amount,
                    date: date || spending.date,
                })
                    .then(spending => res.status(20).json({
                        id: spending.id,
                        title: spending.title,
                        amount: spending.amount,
                        date: spending.date,
                        user: user.id
                    }))
                    .catch(error => res.status(400).json({ message: "Wrong data" }))
            })
            .catch((error) => res.status(404).json({ message: "Spending not found" }));
    },
    remove: (req, res) => {
        const { spendingId } = req.params;
        return models.spending
            .destroy({ where: { id: spendingId } })
            .then(() => res.status(200).json({ message: "Deleted successfully" }))
            .catch(error => res.status(400).json({ message: "Wrong data" }));
    },

};

export default controller;