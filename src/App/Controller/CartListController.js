const UserShema = require("../Model/UserModel");

const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

class CartListController {
  // [GET] me/cart
  getAllCartList(req, res, next) {
    // console.log(req.query.id);
    const id = mongoose.Types.ObjectId(req.query.id);
    UserShema.findOne({ _id: id }).then((data) => {
      res.status(200).json(data);
    });
  }
  // [PUT] me/addcart/id
  addCartList(req, res, next) {
    console.log(req.isMultiple);
    // console.log(req.body);
    if (req.isMultiple) {
      UserShema.updateOne(
        {
          _id: req.body.userID,
          cartlist: { $elemMatch: { id: { $eq: req.body._id } } },
        },
        {
          $inc: { "cartlist.$.quantity": 1 },
        }
      )
        .then(() => {
          res.status(200).json({
            message: "Thêm vào danh sách yêu thích thành công!",
            type: "success",
          });
        })
        .catch(next);
    } else {
      UserShema.updateOne(
        { _id: req.body.userID },
        {
          $push: {
            cartlist: {
              id: req.body._id,
              name: req.body.name,
              price: req.body.price,
              attachment: req.body.img,
              quantity: 1,
            },
          },
        }
      )
        .then(() => {
          res.status(200).json({
            message: "Thêm vào danh sách yêu thích thành công!",
            type: "success",
          });
        })
        .catch(next);
    }
  }
  // [PUT] me/updatecartlist
  updateCartList(req, res, next) {
    // console.log("bat dau tu day : ", req.body);
    UserShema.updateOne(
      { _id: req.body.userID },
      {
        $set: {
          cartlist: req.body.cartlist,
        },
      }
    )
      .then((user) => {
        res.status(200);
      })
      .catch(next);
  }

  // [PUT] me/updatehisotry
  updateHistoryCheckout(req, res, next) {
    // console.log("checkout : ", req.body);
    UserShema.updateOne(
      { _id: req.body.userID },
      {
        $set: {
          historycheckout: req.body.history,
        },
      }
    )
      .then((user) => {
        res.status(200);
      })
      .catch(next);
  }

  // [POST] me/email
  sendEmailToClient(req, res, next) {
    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "aqua_vku_21GIT@outlook.com",
        pass: "tuandzvc123",
      },
    });
    const options = {
      from: "aqua_vku_21GIT@outlook.com",
      to: req.body.email,
      subject: "Confirm your order on aqua_vku_21GIT website",
      text: `Hi ${req.body.name}! We’re happy to let you know that we’ve received your order.Once your package ships, we will send you an email with a tracking number and link so you can see the movement of your package.If you have any questions, contact us here aqua_vku_21GIT@outlook.com`,
    };
    transporter.sendMail(options, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("send mail : ", info.response);
      }
    });
  }
  // [POST] me/emailToAdmin
  sendEmailToAdmin(req, res, next) {
    console.log(req.body);
    const transporterMail = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: req.body.email,
        pass: req.body.pass,
      },
    });
    const options = {
      from: req.body.email,
      to: "aqua_vku_21GIT@outlook.com",
      subject: `Question from a customer named ${req.body.name} who is lived in ${req.body.country}`,
      text: req.body.message,
    };
    transporterMail.sendMail(options, (err, info) => {
      if (err) {
        return res.status(400).json(err);
      } else {
        return res.status(200).json(info);
      }
    });
  }
}

module.exports = new CartListController();
