import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import SearchResult from "./SearchResult";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    height: "80vh",
    overflow: "hidden"
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function MainBody() {
  const classes = useStyles();
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  function isValidURL() {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = youtubeUrl.match(regExp);
    if (match && match[7].length === 11) {
      return true;
    } else {
      return false;
    }
  }

  function handleClick() {
    if (isValidURL()) {
      setSearchTriggered(true);
    }
    else {
      alert("Invalid youtube URL");
    }
  }

  function handleKeywordChange(event) {
    console.log(event.target);
    if (event.target.value.length > 0) {
      setKeyword(event.target.value);
    } else {
      setKeyword("");
    }    
  }

  function handleUrlChange(event) {
    if (event.target.value.length > 0) {
      setYoutubeUrl(event.target.value);
    } else {
      setYoutubeUrl("");
    }    
  }

  return ( 
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <YoutubeSearchedForIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Ctrl F
          </Typography>
        </Toolbar>
      </AppBar>
      <main >
        {/* Hero unit */}
        <div className={classes.heroContent}>
        {youtubeUrl.length && keyword.length && searchTriggered ? (<SearchResult youtubeUrl={youtubeUrl} keyword={keyword} setSearchTriggered={setSearchTriggered}/>) : (
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
              
            >
              Ctrl F
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
              
            >
             Don't have time to watch an entire youtube video to find a specific word? Use this!{" "}
            </Typography>
            <form>

            <div id="input" style={{display: "flex", justifyContent:"center" }}>
                  <TextField style={{ padding: "5px", width: "30%"}} helperText="" error={keyword.length === 0} onChange={handleKeywordChange} id="keyword" label="Keyword" placeholder="economics"/>
                  <TextField style={{ padding: "5px", width: "50%"}} helperText="" error={youtubeUrl.length === 0} onChange={handleUrlChange} id="url" label="Youtube URL" placeholder="http://youtube.com/videoid" />
                  </div>
              <div className={classes.heroButtons}>
                <Button  type="submit" onClick={handleClick} variant="contained" color="primary">
                  Search
                </Button>
              </div>
              </form>


          </Container>
          )}
        </div>

      </main>
      <footer className={classes.footer}>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
         <a href="https://github.com/rahibk/ctrlf">View Source</a>
        </Typography>
      </footer>
    </React.Fragment>
  );
}
