import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1 className="text-blue-500">Welcome to Remix</h1>
      <h1 className='text-blue-500'>ㅇ응애 시발 드디어 tailwindcss가 먹네 ㅈ같은거</h1>
      <ul>
        <li>
          <Link to="/auth/register">register</Link>
        </li>
      </ul>
    </div>
  );
}
