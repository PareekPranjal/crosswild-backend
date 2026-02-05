import { Blog } from "@/types/blog";
import Image from "next/image";
import { Calendar, User, ArrowRight } from "lucide-react";

const SingleBlog = ({ blog }: { blog: Blog }) => {
  const { title, image, paragraph, author, tags, publishDate } = blog;
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        {/* Tag Badge */}
        {tags && tags.length > 0 && (
          <span className="absolute top-4 right-4 z-10 bg-primary text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
            {tags[0]}
          </span>
        )}
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
          {paragraph}
        </p>

        {/* Author & Date */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          {/* Author */}
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-full overflow-hidden">
              <Image
                src={author.image}
                alt={author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300">
                <User className="w-3.5 h-3.5" />
                <span className="font-semibold">{author.name}</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500">{author.designation}</p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{publishDate}</span>
          </div>
        </div>

        {/* Read More Link */}
        <div className="mt-4 flex items-center gap-2 text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Read More</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
