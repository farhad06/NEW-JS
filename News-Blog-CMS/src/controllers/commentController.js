const Comment = require('../models/Comment.js');
const News = require('../models/News.js');

const commentController = {
    allComments: async (req, res) => {
        let comments;

        if (req.role === 'admin') {
            comments = await Comment.find().populate('article', 'title').sort({ createdAt: -1 });
        } else {
            const news = await News.find({ author: req.id });
            const newsIds = news.map(news => news._id);
            comments = await Comment.find({ article: { $in: newsIds } })
                .polupate('article', 'title').sort({ createdAt: -1 });
        }

        //return res.json(comments);

        res.render('admin/comments', { comments, role: req.role });
    },
    updateCommentStatus: async (req, res) => {
        const comment = await Comment.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });

        if (!comment) {
            req.flash('error', 'Comment Not Found');
            return res.redirect('/admin/comments');
        }

        res.json({ success: true });

    },
    deleteComment: async (req, res) => {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        
        if (!comment) {
            req.flash('error', 'Comment Not Found');
            return res.redirect('/admin/comments');
        }
        res.json({ success: true });
    }
}


module.exports = commentController;