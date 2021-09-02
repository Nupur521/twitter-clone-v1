
function refreshTweets(){
    
    $('#allTweets').empty();

    const tweets = await axios.get('/api/post')
    

    for(let post of tweets.data){
        $('#allTweets').append(`<li>${post.content} by ${post.postedBy}</li>`)
    }
    console.log(tweets);
}

refreshTweets();





$('#submitPostButton').click(async()=>{
    const postText=$('#post-text').val();
    console.log(postText);
    
    await axios.postText('/api/post',{content:postText}); 

    //To refresh the tweets whenever we create a new tweet
    refreshTweets();

    $('#post-text').val("");

})