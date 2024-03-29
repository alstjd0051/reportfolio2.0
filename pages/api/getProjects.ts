import { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { Project } from "../../components/lib/typings";
import { sanityClient } from "../../sanity";

const query = groq`
    *[_type == "project"] {
    ...,
    technologies[]->
    } | order(_createdAt desc)
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const projects: Project[] = await sanityClient.fetch(query);

  res.status(200).json(projects);
}
