package com.liu.persistence.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.liu.persistence.model.Comment;

@Mapper
public interface CommentMapper {

	int save(Comment comment);

	int deleteCommentsByPostId(Long postId);

	int countNumCommentsByPostId(Long postId);

	List<Comment> findCommentsByPostId(Long postId);

	List<Comment> findCommentsByUserId(Long userId);

}
