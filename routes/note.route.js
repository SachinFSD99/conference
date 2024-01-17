const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { NoteModel } = require("../models/notes.model");
const { RegisterModel } = require("../models/register.model");

const noteRouter = express.Router();

noteRouter.get("/", async (req, res) => {
  try {
    // const user = await RegisterModel.find({_id:req.body.UserID})
    const notes = await NoteModel.find();
    res.send(notes);
  } catch (error) {
    res.json({ err: error });
  }
});

noteRouter.get("/mynotes", async (req, res) => {
  try {
    const notes = await NoteModel.find({UserID:req.body.UserID})
    res.send(notes);
  } catch (error) {
    res.json({ err: error });
  }
});

noteRouter.post("/post", async (req, res) => {
  const payload = req.body;
  try {
    const note = new NoteModel(payload);
    await note.save();
    res.status(201).send({ msg: "Notes saved successfully!" });
  } catch (error) {
    res.json({ err: error });
  }
});

noteRouter.patch("/update/:id", async (req, res) => {
  const ID = await NoteModel.findOne({ _id: req.params.id });
  const UserID = req.body.UserID;
  if (UserID == ID.UserID) {
    try {
      await NoteModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
      res.status(202).send({ msg: "Notes updated successfully!" });
    } catch (error) {
      res.status(400).json({ err: error });
    }
  } else {
    res.send({ msg: "You are not authorised!" });
  }
});

noteRouter.delete("/delete/:id", async (req, res) => {
  const ID = await NoteModel.findOne({ _id: req.params.id });
  const UserID = req.body.UserID;
  if (UserID == ID.UserID) {
    try {
      await NoteModel.findByIdAndDelete({ _id: req.params.id }, req.body);
      res.status(202).send({ msg: "Notes deleted successfully!" });
    } catch (error) {
      res.status(400).json({ err: error });
    }
  } else {
    res.send({ msg: "You are not authorised!" });
  }
});

module.exports = { noteRouter };
