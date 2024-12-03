import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import _ from "lodash";  //lodash allows to do everything in lowercase

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');
//is used in an Express.js application to configure the application to use EJS (Embedded JavaScript) as the templating engine for rendering HTML pages.

let posts = [] //create a global value to store all the blogs ahead we get from compose

app.get('/', (req, res) => {
    res.render("home.ejs", {
        homePageContent,
        posts,
    })
})

app.get('/about', (req, res) => {
    res.render("about.ejs", {
        aboutContent,
    })
})

app.get('/contact', (req, res) => {
    res.render("contact.ejs", {
        contactContent,
    })
})

app.get('/compose', (req, res) => {
    res.render('compose.ejs')
})

app.post('/compose', (req, res) => {
    // putting post and title inside of an object "post"//
    const post = {
        title: req.body.titleBody,
        post: req.body.addPost,
    }
    posts = [...posts, post]
    //equaled posts to a cloned array,
    //using ES6 instead of .push

    res.redirect('/')
})

//express route parameteres
app.get('/posts/:postTitle', (req, res) => {
    console.log(req.params.postTitle)
    const requestedTitle = _.lowerCase(req.params.postTitle) //_.lowercase turns everything in lowercase

    posts.forEach(post => {           //for each individual "post"
        const storedTitle = _.lowerCase(post.title)         //_.lowercase turns everything in lowercase
        const storedBody = _.lowerCase(post.post)

        if (storedTitle === requestedTitle) {
            res.render('post', {
                postTitle: storedTitle,
                postBody: storedBody
            })
        }
        else { //create 404 page here
            console.log('No Match Found')
        }
    })
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});


const homePageContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
const aboutContent = 'Rutrum quisque non tellus orci. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Non quam lacus suspendisse faucibus interdum. Dignissim suspendisse in est ante in nibh mauris cursus. Amet consectetur adipiscing elit pellentesque. Eget arcu dictum varius duis at consectetur. Tristique sollicitudin nibh sit amet commodo nulla. Odio euismod lacinia at quis risus sed vulputate odio ut. Viverra tellus in hac habitasse platea dictumst vestibulum. Venenatis cras sed felis eget. Ut consequat semper viverra nam libero justo laoreet sit. Aliquam purus sit amet luctus venenatis lectus magna fringilla urna. Commodo nulla facilisi nullam vehicula ipsum a arcu. Arcu vitae elementum curabitur vitae.Sit amet massa vitae tortor condimentum lacinia quis.Eu facilisis sed odio morbi quis commodo odio.Id diam maecenas ultricies mi eget.Interdum consectetur libero id faucibus nisl tincidunt eget nullam non.Lobortis elementum nibh tellus molestie nunc.Sed viverra ipsum nunc aliquet bibendum enim facilisis gravida.Malesuada fames ac turpis egestas sed tempus urna et.At tempor commodo ullamcorper a lacus vestibulum sed.Arcu ac tortor dignissim convallis aenean.'
const contactContent = 'Pretium aenean pharetra magna ac placerat vestibulum. Lacus vestibulum sed arcu non odio euismod lacinia at. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Feugiat vivamus at augue eget. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Diam sollicitudin tempor id eu nisl nunc. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Pellentesque nec nam aliquam sem et tortor consequat. Vitae elementum curabitur vitae nunc sed velit. Enim sit amet venenatis urna cursus eget nunc scelerisque viverra. Cursus sit amet dictum sit amet. Rhoncus dolor purus non enim praesent elementum facilisis.'