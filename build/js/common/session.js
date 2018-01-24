Yue.isOwner = function(userId){
    return userId && userId === session.userId || session.userId.split('_')[0] === userId;
};