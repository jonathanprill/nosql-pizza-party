//NEW FILE

const router = require('express').Router();

const {
    addComment,
    removeComment
} = require('../../controllers/comment-controllers');

router
.route('/:pizzaId')
.post(addComment);

//you need two parameters to delete a comment
router
.route('/:pizzaId/:commentId')
.delete(removeComment);



module.exports = router;