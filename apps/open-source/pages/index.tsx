import { useState, useEffect } from 'react'
import { Octokit } from '@octokit/core'
import SectionContainer from '../components/SectionContainer'
import open_source from '../data/opensource.json'
import Image from 'next/image'
import Link from 'next/link'

const openSource = () => {
  const octokit = new Octokit()
  const [activePill, setActivePill] = useState('All')
  const [repos, setRepos] = useState([{}])

  const maintainerTags = open_source.maintainers
    .reduce((acc: any, x: any) => acc.concat(x.tags), []) // get all tags
    .filter((v: any, i: any, a: any) => a.indexOf(v) === i) // remove duplicates
    .sort((a: any, b: any) => a.localeCompare(b)) // alphabetical

  const maintainerPills = ['All'].concat(maintainerTags)

  useEffect(() => {
    async function fetchOctoData() {
      const res = await octokit.request('GET /orgs/{org}/repos', {
        org: 'supabase',
        type: 'public',
        per_page: 6,
        page: 1,
      })
      setRepos(res.data)
    }
    fetchOctoData()
  }, [])

  const meta_title = 'Open Source | Supabase'
  const meta_description =
    'Supabase is an open source company, supporting existing open source tools and communities wherever possible.'

  return (
    <div className="text-scale-1200 container mx-auto">
      <SectionContainer>
        <div className="container">
          <div className="flex items-center mb-16">
            <div className="col">
              <h1 className="mb-10 text-4xl font-medium">Open source</h1>
              <p className="max-w-xl">
                Supabase is an open source company, supporting existing open source tools and
                communities wherever possible.
              </p>
            </div>
          </div>
          <h2 className="mb-6 text-2xl font-medium">Sponsors</h2>
          <div className="mt-16">
            <h4 className="font-bold mt-2">Evangelist: $49 per month</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pl-4 mt-4">
              {open_source.sponsers.Evangelist.map((x: any, index: number) => (
                <Link
                  className="flex items-center gap-4 shadow-none shrink-0"
                  href={`https://github.com/${x.sponsor}`}
                  key={index}
                >
                  <Image
                    src={`https://github.com/${x.sponsor}.png`}
                    width={45}
                    height={45}
                    className="mt-4 mb-4 rounded-full w-12 h-12"
                    alt={`${x.sponsor} avatar`}
                  />
                  <div className="flex items-center flex-col justify-center text-center">
                    <h5>{x.sponsor}</h5>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-16">
            <h4 className="font-bold mt-2">Supporter: $19 per month</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pl-4 mt-4">
              {open_source.sponsers.Supporter.map((x: any, index: number) => (
                <Link
                  className="flex items-center gap-4 shadow-none shrink-0"
                  href={`https://github.com/${x.sponsor}`}
                  key={index}
                >
                  <Image
                    src={`https://github.com/${x.sponsor}.png`}
                    width={45}
                    height={45}
                    className="mt-4 mb-4 rounded-full w-12 h-12"
                    alt={`${x.sponsor} avatar`}
                  />
                  <div className="flex items-center flex-col justify-center text-center">
                    <h5>{x.sponsor}</h5>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-16">
            <h4 className="font-bold mt-2">Contributor: $5 per month</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pl-4 mt-4">
              {open_source.sponsers.Contributor.map((x: any, index: number) => (
                <Link
                  className="flex items-center gap-4 shadow-none shrink-0"
                  href={`https://github.com/${x.sponsor}`}
                  key={index}
                >
                  <Image
                    src={`https://github.com/${x.sponsor}.png`}
                    width={45}
                    height={45}
                    className="mt-4 mb-4 rounded-full w-12 h-12"
                    alt={`${x.sponsor} avatar`}
                  />
                  <div className="flex items-center flex-col justify-center text-center">
                    <h5>{x.sponsor}</h5>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="">
          <h2 className="mb-6 text-2xl font-medium">Community Maintainers</h2>

          <div className="overflow-auto md:max-w-none hidden sm:block">
            <ul className="flex 2xl:gap-4 items-center p-0">
              {maintainerPills.map((x) => (
                <li
                  key={x}
                  className={`mx-4 rounded-t-lg inline-block p-2 cursor-pointer hover:text-brand-800 ${
                    activePill == x ? 'bg-gray-200 dark:bg-gray-400 text-brand-800' : ''
                  }`}
                  onClick={() => setActivePill(x)}
                >
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            {open_source.maintainers
              .filter((x) => activePill == 'All' || x.tags.includes(activePill))
              .sort((a, b) => a.handle.localeCompare(b.handle))
              .map((x, idx) => (
                <div className="" key={idx}>
                  <a
                    className="flex gap-4"
                    href={`https://github.com/${x.handle}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="grow bg-gray-300 dark:bg-gray-400 p-4 rounded-lg">
                      <div className="flex gap-4 shrink-0">
                        <Image
                          className="rounded-full my-0"
                          width={50}
                          height={50}
                          alt={x.handle}
                          src={`https://github.com/${x.handle}.png`}
                        />
                        <div className="">
                          <h4 className="text-lg my-0">@{x.handle}</h4>
                          <span className="text-sm">{x.description}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
          </div>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div>
          <h2 className="mb-6 text-2xl font-medium">Repositories</h2>
          <div className="grid gap-4">
            {repos.map((repo: any, i: number) => (
              <div className="bg-gray-300 dark:bg-gray-400 p-4 rounded-lg" key={i}>
                <a className="h-full" href={repo.html_url}>
                  <div className="card__body">
                    <h4 className="uppercase my-2 font-semibold">{repo.name}</h4>
                    <span className="text-sm">{repo.description}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between py-2 text-xs">
                    <div>@{repo.full_name}</div>
                    <div>{repo.stargazers_count} ★</div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </div>
  )
}

export default openSource
