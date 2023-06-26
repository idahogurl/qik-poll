import PropTypes from 'prop-types';
import NavBar from './NavBar';
import Link from 'next/link';
import Image from 'next/image';

function Layout({ children }) {
  return (
    <>
      <div className='navbar-wrapper'>
        <NavBar />
      </div>
      <div className="container-fluid commands-wrapper">
        <div className="container-fluid">
          <div className="row main text-center">
            <Link href="/poll/view">
              <div className="col col-xs-4 first-col">
                <Image src="images/clipboard.svg" alt="View Polls" width="128" height="128" className="d-none d-sm-block" />
                <div>View Polls</div>
              </div>
            </Link>
            <Link href="/poll/my">
              <div className="col col-xs-4">
                <Image src="images/myPolls.svg" alt="My Polls" width="128" height="128" className="d-none d-sm-block" />
                <div>My Polls</div>
              </div>
            </Link>
            <Link href="/poll/new">
              <div className="col col-xs-4">
                <Image src="images/clipboardNew.svg" alt="New Poll" width="128" height="128" className="d-none d-sm-block" />
                <div>New Poll</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="text-right m-3">
          <small>
            <a href="https://www.freepik.com/free-vector/people-avatars_761436.htm">Icon</a> and&nbsp;
            <a href="https://www.freepik.com/free-vector/round-background-with-person-filling-out-a-form_1078424.htm">icon</a>&nbsp;designed by Freepik
          </small>
        </div>
      </div>
      {children}
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
