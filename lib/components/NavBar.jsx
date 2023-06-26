import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import GitHubButton from './GitHubButton';

function NavBar() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

    return (
      <nav className="navbar">
        <Image src="images/logo_sm.svg" alt="QikPoll Logo" width={172} height={50} />
        <div className="navbar-right mt-2 mt-sm-0">
          <div id="userAccount" className={loading || !session ? 'd-none' : 'd-block'}>
            Welcome, {session?.user.name}!
          </div>
          {loading ? null : 
            <div>
              {session ? <GitHubButton onClick={() => signOut('github')}>Sign Out of</GitHubButton> : <GitHubButton onClick={() => signIn('github')}>Sign In with</GitHubButton>}
            </div>
          }
        </div>
      </nav>);
}

export default NavBar;
