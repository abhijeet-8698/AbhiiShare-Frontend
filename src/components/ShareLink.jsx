import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Link as LinkIcon, Copy, CheckCircle2 } from "lucide-react";

/**
 * ShareLink Component
 * Shows a styled download/share link with copy-to-clipboard support.
 *
 * Props:
 * - link: string (downloadable or shareable URL)
 */
const ShareLink = ({ link }) => {
  const [copied, setCopied] = useState(false);

  if (!link) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full mt-4"
    >
      <div className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <LinkIcon size={18} className="text-blue-500" />
            <span>Shareable Link</span>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-all duration-300 ${
              copied
                ? "bg-green-500 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {copied ? (
              <>
                <CheckCircle2 size={16} />
                Copied
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy
              </>
            )}
          </button>
        </div>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm break-all underline underline-offset-2"
        >
          {link}
        </a>
      </div>
    </motion.div>
  );
};

ShareLink.propTypes = {
  link: PropTypes.string,
};

export default ShareLink;
