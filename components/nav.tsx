import Link from 'next/link'


export default function Nav() {
  return (
    <nav>
      <ul className="flex justify-between items-center p-8">
        <li>
          <Link href="/">
            <a className="text-blue-500 no-underline">Home</a>
          </Link>
          <Link href="/register">
            <a className="text-blue-500 no-underline pl-4">Register</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
