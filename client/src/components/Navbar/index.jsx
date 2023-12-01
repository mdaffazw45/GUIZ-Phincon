import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { Avatar } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { LeaderboardOutlined, Logout, Person } from '@mui/icons-material';

import Logo from '@components/Logo';
import TranslateDropdown from '@components/TranslateDropdown';

import { getUserById, logout } from '@containers/Client/actions';
import { selectToken, selectUser } from '@containers/Client/selectors';

import classes from './style.module.scss';

const Navbar = ({ title, token, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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
            <div
              className={
                location.pathname === '/leaderboard'
                  ? `${classes.leaderboard} ${classes.active}`
                  : `${classes.leaderboard} `
              }
              onClick={() => navigate('/leaderboard')}
            >
              <LeaderboardOutlined />
              <div className={classes.leaderboard__text}>
                <FormattedMessage id="app_leaderboard" />
              </div>
            </div>
          )}
        </div>
        <div className={classes.toolbar}>
          {!token && location.pathname !== '/register' && location.pathname !== '/login' && (
            <div className={classes.loginButton} onClick={() => navigate('/login')}>
              <FormattedMessage id="app_login_button" />
            </div>
          )}
          <TranslateDropdown />
          {token && (
            <>
              <div className={classes.profileIconContainer} onClick={handleClickProfile}>
                <Avatar
                  src={
                    user?.avatar?.startsWith('blob')
                      ? user.avatar
                      : `${import.meta.env.VITE_API_BASE_URL}${user?.avatar}`
                  }
                />
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
                <MenuItem onClick={() => navigate(`/profile/${user.username}`)}>
                  <ListItemIcon>
                    <Person fontSize="small" />
                  </ListItemIcon>
                  <FormattedMessage id="app_profile" />
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <FormattedMessage id="app_logout" />
                </MenuItem>
              </Menu>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  token: PropTypes.string,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  user: selectUser,
});

export default connect(mapStateToProps)(Navbar);
