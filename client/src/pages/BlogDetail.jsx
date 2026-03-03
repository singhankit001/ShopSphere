import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen, ChevronRight, Calendar, User } from 'lucide-react';
import { getBlogBySlug, getRelatedPosts } from '../data/blogData';

/* ── Content renderer ─────────────────────────────────────────────── */
const ContentBlock = ({ block, index }) => {
  const delay = 0.1 + index * 0.04;

  switch (block.type) {
    case 'heading':
      return (
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay }}
          className="text-2xl font-black text-slate-900 tracking-tight mt-[40px] mb-[16px]"
          style={{ wordBreak: 'keep-all' }}
        >
          {block.text}
        </motion.h2>
      );

    case 'callout':
      return (
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay }}
          className="my-[32px] pl-[20px] border-l-[4px] border-[#10B981] bg-emerald-50 rounded-r-[16px] py-[20px] pr-[24px]"
        >
          <p className="text-[#065F46] font-bold text-[17px] leading-relaxed">{block.text}</p>
        </motion.div>
      );

    case 'paragraph':
    default:
      return (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay }}
          className="text-slate-600 text-[17px] font-medium leading-[1.75] mb-[24px]"
        >
          {block.text}
        </motion.p>
      );
  }
};

/* ── Related card ─────────────────────────────────────────────────── */
const RelatedCard = ({ post }) => (
  <Link
    to={`/blog/${post.slug}`}
    className="group block bg-white rounded-[24px] border border-slate-100 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-[2px]"
  >
    <div className="h-[160px] overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="p-[20px]">
      <span className={`inline-block text-[10px] font-black uppercase tracking-widest px-[10px] py-[4px] rounded-full border mb-[10px] ${post.categoryColor}`}>
        {post.category}
      </span>
      <h4 className="text-[15px] font-black text-slate-900 leading-snug group-hover:text-purple-600 transition-colors tracking-tight">
        {post.title}
      </h4>
    </div>
  </Link>
);

/* ── Main page ────────────────────────────────────────────────────── */
const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getBlogBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  /* ── 404 fallback ── */
  if (!post) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6 pt-24 pb-20">
        <div className="text-center max-w-md">
          <div className="w-[80px] h-[80px] bg-purple-50 rounded-[24px] flex items-center justify-center mx-auto mb-[24px]">
            <BookOpen className="w-[40px] h-[40px] text-purple-400" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-[12px]">
            Article not found
          </h1>
          <p className="text-slate-500 font-medium mb-[32px]">
            This article doesn't exist or may have been moved.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 h-[52px] px-[32px] bg-slate-900 text-white rounded-[16px] font-black text-[12px] uppercase tracking-widest hover:bg-black transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post.related || []);

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">

      {/* ── Back nav ── */}
      <div className="max-w-[860px] mx-auto px-6 mb-[40px]">
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center gap-[8px] text-[12px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
          style={{ minHeight: 0, padding: 0, background: 'none', border: 'none', boxShadow: 'none' }}
        >
          <ArrowLeft className="w-[16px] h-[16px]" />
          Back to Blog
        </button>
      </div>

      {/* ── Article header ── */}
      <div className="max-w-[860px] mx-auto px-6">

        {/* Category tag */}
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`inline-block text-[11px] font-black uppercase tracking-widest px-[14px] py-[6px] rounded-full border mb-[20px] ${post.categoryColor}`}
        >
          {post.category}
        </motion.span>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.05] mb-[24px] font-premium"
          style={{ wordBreak: 'keep-all' }}
        >
          {post.title}
        </motion.h1>

        {/* Excerpt */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-500 font-medium leading-relaxed mb-[32px]"
        >
          {post.excerpt}
        </motion.p>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12 }}
          className="flex flex-wrap items-center gap-[24px] pb-[32px] border-b border-slate-100 mb-[40px]"
        >
          {/* Author */}
          <div className="flex items-center gap-[10px]">
            <div className="w-[40px] h-[40px] rounded-full bg-slate-900 text-white flex items-center justify-center text-[12px] font-black">
              {post.author.avatar}
            </div>
            <div>
              <p className="text-[13px] font-black text-slate-900">{post.author.name}</p>
              <p className="text-[11px] font-bold text-slate-400">{post.author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-[6px] text-slate-400">
            <Calendar className="w-[14px] h-[14px]" />
            <span className="text-[12px] font-black uppercase tracking-widest">{post.date}</span>
          </div>

          <div className="flex items-center gap-[6px] text-slate-400">
            <Clock className="w-[14px] h-[14px]" />
            <span className="text-[12px] font-black uppercase tracking-widest">{post.readTime}</span>
          </div>
        </motion.div>
      </div>

      {/* ── Cover image ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="max-w-[1000px] mx-auto px-6 mb-[56px]"
      >
        <div className="rounded-[32px] overflow-hidden shadow-[0_16px_48px_-8px_rgba(0,0,0,0.1)]">
          <img
            src={post.image}
            alt={post.title}
            className="w-full aspect-[16/7] object-cover"
          />
        </div>
      </motion.div>

      {/* ── Article body ── */}
      <div className="max-w-[720px] mx-auto px-6">
        {post.content.map((block, i) => (
          <ContentBlock key={i} block={block} index={i} />
        ))}
      </div>

      {/* ── Related articles ── */}
      {relatedPosts.length > 0 && (
        <div className="max-w-[860px] mx-auto px-6 mt-[80px]">
          <div className="border-t border-slate-100 pt-[56px]">
            <div className="flex items-center justify-between mb-[32px]">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Related Articles</h3>
              <Link
                to="/blog"
                className="inline-flex items-center gap-1 text-[12px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
                style={{ minHeight: 0, padding: 0, background: 'none', border: 'none', boxShadow: 'none' }}
              >
                All posts <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
              {relatedPosts.map((p) => (
                <RelatedCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BlogDetail;
