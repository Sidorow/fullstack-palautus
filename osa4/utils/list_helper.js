const dummy = (blogs) => {
    return 1
  }

  const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }
    var total = 0
    for (var i = 0; i < blogs.length; i++) {
        total = total + blogs[i].likes
    }
    return total
}
  
  module.exports = {
    dummy,
    totalLikes
  }