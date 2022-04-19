//NEW FILE

const router = require('express').Router();

const {
    addComment,
    removeComment,
    addReply,
    removeReply
} = require('../../controllers/comment-controllers');

router
    .route('/:pizzaId')
    .post(addComment);

//you need two parameters to delete a comment
router
    .route('/:pizzaId/:commentId')
    .put(addReply)
    .delete(removeComment);

//delete a reply
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);


module.exports = router;