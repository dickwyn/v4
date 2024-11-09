export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl">
        Dick Wyn <b>Yong</b>
      </h1>
      <section className="grid gap-2">
        <p>
          i&apos;m a software engineer at{' '}
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
          i&apos;m currently into running and plane photography but i used to upload videos on my{' '}
          <a href="https://www.youtube.com/dickwyn" target="_blank" rel="noopener noreferrer">
            YouTube
          </a>{' '}
          channel about how technology gets applied in my everyday life.
        </p>
        <p>
          my weekly schedule minus sleeping comprises 30% coding, 10% meetings, 10% cooking, 30%
          watching youtube, and 20% running (plus exercising)
        </p>
        <p>i like consumer technology, airplanes, photography and eating + cooking chicken rice</p>
        <p className="mt-3 italic">
          p.s. i don&apos;t have a middle name, my first name has two words (Dick Wyn).
        </p>
      </section>
    </section>
  );
}
