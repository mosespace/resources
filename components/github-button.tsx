"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Github, Star } from "lucide-react";

const GitHubButton = () => {
  const [stars, setStars] = useState<any>("63");

  const kFormatter = (num: number) => {
    const kFormat = num / 1000;
    const decimals = kFormat.toFixed(2).split(".")[1];
    const firstDecimal = decimals.split("")[0];
    const showDecimals = firstDecimal !== "0";

    return kFormat.toFixed(showDecimals ? 1 : 0);
  };

  useEffect(() => {
    async function fetchOctoData() {
      const { Octokit } = await import("@octokit/core");
      const octokit = new Octokit();
      const res = await octokit.request("GET /repos/{owner}/{repo}", {
        owner: "mosespace",
        repo: "resources",
        type: "public",
      });
      //   console.log(res);

      setStars(
        // kFormatter
        res.data?.stargazers_count
      );
    }
    fetchOctoData();
  }, []);

  return (
    <Button variant='outline'>
      <Link
        type={undefined}
        href='https://github.com/mosespace/resources'
        target='_blank'
      >
        <span className='flex items-center gap-1'>
          <Github className='w-4 h-4' />
          {stars}K
          {/* <span className='text-xs text-amber-500'>Start(s)</span> */}
          {/* <Star className='fill-amber-500 w-3 h-3 text-amber-500' />
          <Star className='fill-amber-500 w-3 h-3 text-amber-500' />
          <Star className='fill-amber-500 w-3 h-3 text-amber-500' /> */}
        </span>
      </Link>
    </Button>
  );
};

export default GitHubButton;
