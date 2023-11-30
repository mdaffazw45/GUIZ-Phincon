import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import ProfileIcon from '@static/images/profile.svg';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Lock, Logout, Person } from '@mui/icons-material';

import Logo from '@components/Logo';

import { setLocale } from '@containers/App/actions';
import { getUserById, logout } from '@containers/Client/actions';

import { selectToken } from '@containers/Client/selectors';
import classes from './style.module.scss';

const Navbar = ({ title, locale, token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuPosition, setMenuPosition] = useState(null);
  const open = Boolean(menuPosition);
  const [color, setColor] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(getUserById(token));
    }
  }, [dispatch, token]);

  const changeColor = () => {
    if (window.scrollY >= 100) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener('scroll', changeColor);

  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  const onSelectLang = (lang) => {
    if (lang !== locale) {
      dispatch(setLocale(lang));
    }
    handleClose();
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const opened = Boolean(anchorEl);
  const handleClickProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setAnchorEl(null);
  };

  const navigateLogin = () => {
    navigate('/login');
  };

  const navigateChangePassword = () => {
    navigate('/change-password');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigateLogin();
  };

  return (
    <div
      className={color ? `${classes.headerWrapper} ${classes.headerWrapperBg}` : ` ${classes.headerWrapper} `}
      data-testid="navbar"
    >
      <div className={classes.contentWrapper}>
        <div className={classes.left}>
          <Logo title={title} />

          {token && (
            <div className={classes.leaderboard}>
              <FormattedMessage id="app_leaderboard" />
            </div>
          )}
        </div>
        <div className={classes.toolbar}>
          {!token && location.pathname !== '/register' && location.pathname !== '/login' && (
            <div className={classes.loginButton} onClick={() => navigate('/login')}>
              <FormattedMessage id="app_login_button" />
            </div>
          )}
          <div className={classes.toggle} onClick={handleClick}>
            <Avatar className={classes.avatar} src={locale === 'id' ? '/id.png' : '/en.png'} />
            <div className={classes.lang}>{locale}</div>
            <ExpandMoreIcon />
          </div>
          {token && (
            <>
              <div className={classes.profileIconContainer} onClick={handleClickProfile}>
                <img src={ProfileIcon} className={classes.profileIcon} alt="icon" />
              </div>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={opened}
                onClose={handleCloseProfile}
                onClick={handleCloseProfile}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick="/">
                  <ListItemIcon>
                    <Person fontSize="small" />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                <MenuItem onClick={navigateChangePassword}>
                  <ListItemIcon>
                    <Lock fontSize="small" />
                  </ListItemIcon>
                  Change Password
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </div>
        <Menu open={open} anchorEl={menuPosition} onClose={handleClose}>
          <MenuItem onClick={() => onSelectLang('id')} selected={locale === 'id'}>
            <div className={classes.menu}>
              <Avatar className={classes.menuAvatar} src="/id.png" />
              <div className={classes.menuLang}>
                <FormattedMessage id="app_lang_id" />
              </div>
            </div>
          </MenuItem>
          <MenuItem onClick={() => onSelectLang('en')} selected={locale === 'en'}>
            <div className={classes.menu}>
              <Avatar className={classes.menuAvatar} src="/en.png" />
              <div className={classes.menuLang}>
                <FormattedMessage id="app_lang_en" />
              </div>
            </div>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  locale: PropTypes.string.isRequired,
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

export default connect(mapStateToProps)(Navbar);
