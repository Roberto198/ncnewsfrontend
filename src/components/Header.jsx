import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  InputBase,
  Button,
  Menu,
  MenuItem
} from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { navigate } from "@reach/router";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  toolbar: theme.mixins.toolbar
});

class Header extends React.Component {
  state = {
    search: "",
    usernameInput: null,
    anchorEl: null,
    loggedInUser: null,
    isDesktop: false
  };

  componentDidMount() {
    const width = window.innerWidth;
    if (width > 700) {
      this.setState({ isDesktop: true });
    }
    window.addEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    const width = window.innerWidth;
    if (width > 700) {
      this.setState({ isDesktop: true });
    } else if (width < 700) {
      this.setState({ isDesktop: false });
    }
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.toolbar} />
        <AppBar position='fixed'>
          <Toolbar>
            <div>
              <Button
                aria-owns={anchorEl ? "menu" : undefined}
                aria-haspopup='true'
                onClick={this.handleClick}
              >
                <MenuIcon />
              </Button>
              <Menu
                id='menu'
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                {this.props.loggedInUser ? (
                  <div>
                    <MenuItem onClick={this.logOut}>Logout</MenuItem>
                    <MenuItem onClick={this.profile}>
                      {this.props.loggedInUser}'s Profile
                    </MenuItem>
                  </div>
                ) : (
                  <div>
                    <MenuItem>
                      <form onSubmit={this.submitUsername}>
                        Username:{"  "}
                        <InputBase
                          type='text'
                          onChange={this.handleInput}
                          placeholder='E.g.: jessjelly'
                        />
                      </form>
                    </MenuItem>
                  </div>
                )}
                {this.state.isDesktop === false ? (
                  <div>
                    {" "}
                    <MenuItem onClick={this.goHome}>Home</MenuItem>
                    <MenuItem onClick={this.goTopics}> Topics </MenuItem>
                  </div>
                ) : null}
              </Menu>
            </div>
            <Button
              href='/'
              size='large'
              className={classes.title}
              variant='text'
              color='inherit'
              nowrap='true'
            >
              NC News
            </Button>{" "}
            <div className={classes.grow} />
            <Button
              href='/topics'
              className={classes.title}
              color='inherit'
              nowrap='true'
            >
              Topics
            </Button>
            <Button
              href='/'
              className={classes.title}
              color='inherit'
              nowrap='true'
            >
              Home
            </Button>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <form onSubmit={this.submitSearch}>
                <InputBase
                  placeholder='Search…'
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  onChange={this.updateSearch}
                  value={this.state.search}
                  endAdornment={
                    <Button onClick={this.clearSearchBox}>X</Button>
                  }
                />
              </form>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  updateSearch = e => {
    this.setState({ search: e.target.value });
  };

  submitSearch = e => {
    e.preventDefault();
    this.props.basicSearch(this.state.search);
    this.setState({ search: "" });
  };
  clearSearchBox = () => {
    this.setState({ search: "" });
  };
  exitSearch = () => {
    this.props.basicSearch("");
    this.setState({ search: "" });
  };

  handleInput = e => {
    this.setState({ usernameInput: e.target.value });
  };

  submitUsername = e => {
    e.preventDefault();
    this.props.setUsername(this.state.usernameInput);
  };

  logOut = e => {
    this.props.logOut();
    this.handleClose();
  };

  profile = () => {
    navigate(`/users/${this.props.loggedInUser}`);
    this.handleClose();
  };
  goHome = () => {
    navigate("/");
    this.props.basicSearch("");
    this.setState({ search: "" });
    this.handleClose();
  };
  goTopics = () => {
    navigate("/topics");
    this.setState({ search: "" });
    this.handleClose();
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
