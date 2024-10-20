import { BlogPosts } from 'app/components/posts';

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl">
        Dick Wyn <b>Yong</b>
      </h1>
      <section className="grid gap-2">
        <p>
          i'm a software engineer at{' '}
          <a href="https://microsoft.com" target="_blank" rel="noopener noreferrer">
            Microsoft
          </a>
        </p>
        <p>
          i was born and raised in malaysia and got my computer science degree from{' '}
          <a href="https://www.asu.edu/" target="_blank" rel="noopener noreferrer">
            ASU
          </a>
        </p>
        <p>
          also, i upload videos on my{' '}
          <a href="https://www.youtube.com/dickwyn" target="_blank" rel="noopener noreferrer">
            YouTube
          </a>{' '}
          channel about how technology gets applied in my everyday life
        </p>
        <p>
          my weekly schedule minus sleeping comprises 20% coding, 10% meetings, 10% cooking, 30%
          video production, 25% learning
        </p>
        <p>i like consumer technology, airplanes, photography and eating + cooking chicken rice</p>
      </section>
    </section>
  );
}
