
import { signOut, useSession } from 'next-auth/react';

const MyComponent = () => {
  const { data: session } = useSession();

  if (session) {
    // User is logged in
    return (
      <div>
        <h1>Welcome, {session.user.name}!</h1>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  } else {
    // User is not logged in
    return <div>You are not logged in. Please sign in.</div>;
  }
};

export default MyComponent;