import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaInstagram, FaGithub, FaYoutube, FaTwitter } from "react-icons/fa";
import DashBoard from "../Discover Page/DashBoard";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3200/profile/${id}`);
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 dark:text-gray-300">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-gray-100">
      <DashBoard />

      {/* Profile section */}
      <div className="flex gap-10 items-start px-12 py-10">
        {/* Profile Picture */}
        {!imgError ? (
          <img
            src={user.profilepic}
            alt="Profile"
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className="w-36 h-36 rounded-full object-cover shadow-lg"
          />
        ) : (
          <div className="w-36 h-36 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
            {user.displayName ? user.displayName[0] : "U"}
          </div>
        )}

        {/* Details */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {user.displayName}
          </h1>
          <p className="text-gray-700 dark:text-gray-400">@{user.username}</p>
          <p className="mt-1 text-gray-800 dark:text-gray-300">{user.email}</p>

          {user.bio && (
            <p className="mt-5 text-lg text-gray-900 dark:text-gray-200 max-w-2xl leading-relaxed">
              {user.bio}
            </p>
          )}

          {user.phone && (
            <p className="mt-4 font-medium text-gray-900 dark:text-gray-200">
              📞 {user.phone}
            </p>
          )}

          {/* Social Links */}
          <div className="flex gap-6 mt-6">
            {user.social_links?.insta && (
              <a
                href={user.social_links.insta}
                target="_blank"
                rel="noreferrer"
                className="text-pink-500 hover:scale-110 transition"
              >
                <FaInstagram size={28} />
              </a>
            )}
            {user.social_links?.github && (
              <a
                href={user.social_links.github}
                target="_blank"
                rel="noreferrer"
                className="text-gray-700 dark:text-gray-200 hover:text-purple-400 hover:scale-110 transition"
              >
                <FaGithub size={28} />
              </a>
            )}
            {user.social_links?.youtube && (
              <a
                href={user.social_links.youtube}
                target="_blank"
                rel="noreferrer"
                className="text-red-500 hover:scale-110 transition"
              >
                <FaYoutube size={28} />
              </a>
            )}
            {user.social_links?.twitter && (
              <a
                href={user.social_links.twitter}
                target="_blank"
                rel="noreferrer"
                className="text-sky-400 hover:scale-110 transition"
              >
                <FaTwitter size={28} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
