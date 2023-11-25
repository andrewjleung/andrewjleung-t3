import { Inter } from "next/font/google";
import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const inter700 = Inter({ weight: "700", subsets: ["latin"] });

export default function QuittersBlogPost() {
  return (
    <article className="prose prose-neutral mt-2 max-w-screen-lg p-6 dark:prose-invert">
      <div className="text-lg text-neutral-500">
        {dayjs("2022-08-26").fromNow()}
      </div>
      <div className={clsx(inter700.className, "mt-1 text-4xl")}>Quitters</div>
      <p>
        By sophomore year of high school, I had rather large hands. On smaller
        phones, I fumbled keys. My fingers squeezed between half steps on the
        neck of a violin. Despite the inconvenience, I kept creating small.
        Small handwriting, small cartoon characters in the corners of papers,
        noodling on a three-quarter size guitar, harmonizing under my breath in
        falsetto to my favorite songs.
      </p>
      <p>
        Listening on tiny earbuds, I was perplexed by how my favorite songs,
        hitching themselves on waves of imperceptible, tiny particles in the
        air, could be perceived on such a gigantic scale. Each strum, strike,
        and strain of voice slipped through a tiny speaker grate. And yet, they
        had the strength to stir a deep instinctual response in me, lifting
        hairs on my neck and arms.
      </p>
      <p>
        Dissecting these small recordings, I spent weekends and car rides
        painstakingly recreating sounds and arrangements in GarageBand's mobile
        app. I manually tapped in MIDI runs, aimlessly played with parameters
        for effects I hardly knew the purpose off (lord knows what a compressor
        does, I thought it just made guitars sound more plucky though that's not
        too far off), and recorded audio through the tiny hole of a speaker
        within my headphone's volume module.
      </p>
      <p>
        Those small recordings soon grew too large for a tiny touchscreen. I
        needed more from audio. There was so much more ground I could cover, and
        so little room left on my phone's storage. Come senior year of high
        school, I wandered into the territory of professional-grade production
        software. Skipping the desktop version of GarageBand entirely, I soon
        found myself staring into the gaping hole that is a fully fledged DAW,
        Logic Pro X to be specific. I was soon inundated with dynamic and
        time-based effects, modulators, parametric EQ, routing, and an extensive
        library of sounds and instruments.
      </p>
      <p>
        For a time, it was new, wonderful, intriguing. I had no idea what was
        actually going on with the turn of each knob, how to best use each tool
        to make my recordings better, or what “better” even meant. For a time,
        it meant “soaked in reverb” and “muddy to hell,” but these were rites of
        passage. Porting over my sessions from GarageBand, I fleshed out their
        barebones ideas, re-recorded other aspects, fantasized about showing
        these songs to everyone I knew like I had something to prove. With every
        tool you ever could need at your disposal, you can achieve anything,
        right?
      </p>
      <p>
        When I used to toil over tiny controls, furiously thumbing my phone
        screen in landscape to write out a MIDI melody, ideas were immediate.
        Whatever I heard could precipitate in an instant, a single touch. There
        was never a time I stared at that tiny screen and felt lost. And yet,
        here I was, sitting in front of Logic's premier sampler synth, Alchemy,
        stumbling and tripping down a preset browser without a single aim. There
        was no transformation or transmutation from one element to another, just
        a cacophony of one-second previews as I looked for a sound that would
        trigger some inspiration.
      </p>
      <p>
        At times I labored in Logic for hours, coming out with nothing to show
        for it but two chords and a slightly sweatier chair. Making a recording
        felt tedious. Plug in the guitar. Check the levels. Noodle. Record a
        little chord progression. It's clipping? Check the levels again. Fixed?
        Well, now you've listened to that chord progression too much and hate
        it. Why not just jam that one riff you know from that one song? Sounds
        better than anything you could ever come up with.
      </p>
      <p>Maybe I'll call it a day.</p>
      <p>
        I think I accidentally called it a few years. Across my time as an
        underclassman, very little happened. Not a single finished song. Not a
        single idea that came to fruition. Hours and hours spent in Logic,
        Ableton, even FL Studio on rare occasion, but very little progress.
        Every now and then there'd be a recording done for a class which I'd
        feel satisfied with. Enough to tide me over for a few months listening
        to it, really savoring that tiny pang of pride and accomplishment. I
        often fantasized about my ideas being so good that if I were to release
        them, they'd be met with heavy praise. Emphasis on the “if I were to
        release” part.
      </p>
      <p>
        No matter what, the re-realization would set back in that something
        wasn't working. That sense of wonder and curiosity, motivation and
        gratification, that unadulterated drive to create, gone. I watched as
        musicians around me put love into their craft, made both bad music and
        good music. They seemed okay with the bad music. I wouldn't stand it for
        a single second if it came from my hands, so I made nothing. I listened
        and fantasized that I had some x-factor which set me apart from them.
        It's okay I never finished or put anything out, as long as I could
        convince myself I was better than them.
      </p>
      <p>
        But musicians these days are talented. Ludicrously talented. If you've
        somehow convinced yourself for a second that you can keep up with these
        artists who really give it their all, you're definitely wrong. They love
        this craft. They have the guts to bare their work to themselves and
        others. Even faced with a growing musical language, breadth of tools,
        and already incomprehensibly large pool of like-minded and talented
        peers, they keep creating. They don't compare, they contrast. And here I
        am comparing.
      </p>
      <p>
        As I kept comparing myself to every small musical threat around me, the
        walls came up. I became everything I hated about musicians. Judging,
        gatekeeping, bitter, overwhelmed, dumping thousands of dollars on
        equipment and software I'd never use, subsisting solely on pride and
        praise. I couldn't even listen to music anymore. I would mix a single
        song for an entire year and just not release it. In the rare case I did
        release something, it only stirred unease. That and a furious obsession
        with release metrics. Sheesh.
      </p>
      <p>
        With that, my creation came to a standstill in my final year of
        undergrad. I never moved an inch beyond class assignments. I knew how to
        use all these tools but just didn't care. It wasn't fun.
      </p>
      <p>
        I made the conscious decision to quit music the summer after graduation.
        It was either one endeavor or another, and I chose to go all into a
        computer science career. Studying technicals and doing side projects was
        going to take up most of my time. While leading up to that decision it
        felt like a cop out, it was probably one of the most freeing decisions
        I've ever made in my life.
      </p>
      <p>
        Sometimes we stretch ourselves thin. Convince ourselves that we're
        better than others. Take every tiny bit of enjoyment for granted in
        favor of shinier things. I miss those times tapping at GarageBand,
        muddying the hell out of my recordings, not giving a damn about dynamic
        range, high passes, or the timbre of a snare. Sound was a promise of an
        emotion, something tiny and imperceptible yet punching far above its
        weight class. It meant something to me, and I didn't need to think about
        it for that to be the case.
      </p>
      <p>
        For me, music is not the right venture at the current moment. I need to
        reevaluate and re-cultivate my love for it while not under the constant
        pressure to create. I can't bring myself to continue until I can
        re-muster that appreciation I once had. In coming to that conclusion,
        for the first time in my musician's tumult, I feel peace. I'll watch
        others grow and succeed, fail and grow, share a love for the strange
        movements of these strange little particles. Because my music is tiny
        and imperceptible. My music flourishes on a single-octave touchscreen
        keyboard. My music takes up the corners of loose-leaf paper. My music is
        there for me when I next need it.
      </p>
    </article>
  );
}
