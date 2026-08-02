include(CheckFunctionExists)
include(CheckIncludeFile)
include(CheckTypeSize)

set(HEADER_LIST
	alloca.h
	byteswap.h
	cpuid.h
	dlfcn.h
	inttypes.h
	memory.h
	stdint.h
	stdlib.h
	strings.h
	string.h
	sys/ioctl.h
	sys/param.h
	sys/stat.h
	sys/types.h
	termios.h
	unistd.h
	x86intrin.h
)
foreach(HEADER_CHECK ${HEADER_LIST})
	string(TOUPPER "${HEADER_CHECK}" HEADER_VAR_NAME)
	string(REPLACE "/" "_" HEADER_VAR_NAME "${HEADER_VAR_NAME}")
	string(REPLACE "." "_" HEADER_VAR_NAME "${HEADER_VAR_NAME}")
	check_include_file(${HEADER_CHECK} HAVE_${HEADER_VAR_NAME})
endforeach()

set(CMAKE_REQUIRED_LIBRARIES m)
set(FUNCTION_LIST
	clock_gettime
	getopt_long
	iconv
	lround
	setenv
	sinf
)
foreach(FN ${FUNCTION_LIST})
	string(TOUPPER "${FN}" FN_VAR_NAME)
	check_function_exists("${FN}" HAVE_${FN_VAR_NAME})
endforeach()

# libFLAC ----------------------------------------------------------------------
# The CMakeLists isn't as compatible as we'd like so here's an alternate build

set(LIBFLAC flac)

set(PACKAGE_VERSION "\"1.4.3\"")
set(FLAC__HAS_OGG "(0)") # Don't need OGG support here
set(FLAC__NO_ASM 1)
set(FLAC__HAS_X86INTRIN ${HAVE_X86INTRIN_H})
set(FLAC__USE_AVX 1)

# Hack
set(FLAC__CPU_IA32 "\n#if !defined __i386__ && !defined _M_IX86\n#undef FLAC__CPU_IA32\n#endif")
set(FLAC__CPU_X86_64 "\n#if !defined __x86_64__ && !defined _M_X64\n#undef FLAC__CPU_X86_64\n#endif")
set(FLAC__CPU_PPC "\n#if !defined __powerpc__ && !defined _M_PPC\n#undef FLAC__CPU_PPC\n#endif")
set(CPU_IS_BIG_ENDIAN "\n#if !defined __powerpc__ && !defined _M_PPC\n#undef CPU_IS_BIG_ENDIAN\n#endif")
set(CPU_IS_LITTLE_ENDIAN "\n#if defined __powerpc__ || defined _M_PPC\n#undef CPU_IS_LITTLE_ENDIAN\n#endif")

configure_file(${LIBFLAC}/config.cmake.h.in ${CMAKE_CURRENT_BINARY_DIR}/include/FLAC/private/config.h)

if(WIN32)
	set(FLAC_EXTRA_SOURCES ${LIBFLAC}/src/share/win_utf8_io/win_utf8_io.c)
else()
	set(FLAC_EXTRA_SOURCES "")
endif()

add_library(FLAC STATIC
	${FLAC_EXTRA_SOURCES}

	${LIBFLAC}/src/libFLAC/bitmath.c
	${LIBFLAC}/src/libFLAC/bitreader.c
	${LIBFLAC}/src/libFLAC/bitwriter.c
	${LIBFLAC}/src/libFLAC/cpu.c
	${LIBFLAC}/src/libFLAC/crc.c
	${LIBFLAC}/src/libFLAC/fixed.c
	${LIBFLAC}/src/libFLAC/fixed_intrin_avx2.c
	${LIBFLAC}/src/libFLAC/fixed_intrin_sse2.c
	${LIBFLAC}/src/libFLAC/fixed_intrin_sse42.c
	${LIBFLAC}/src/libFLAC/fixed_intrin_ssse3.c
	${LIBFLAC}/src/libFLAC/float.c
	${LIBFLAC}/src/libFLAC/format.c
	${LIBFLAC}/src/libFLAC/lpc.c
	${LIBFLAC}/src/libFLAC/lpc_intrin_avx2.c
	${LIBFLAC}/src/libFLAC/lpc_intrin_fma.c
	${LIBFLAC}/src/libFLAC/lpc_intrin_neon.c
	${LIBFLAC}/src/libFLAC/lpc_intrin_sse2.c
	${LIBFLAC}/src/libFLAC/lpc_intrin_sse41.c
	${LIBFLAC}/src/libFLAC/md5.c
	${LIBFLAC}/src/libFLAC/memory.c
	${LIBFLAC}/src/libFLAC/metadata_iterators.c
	${LIBFLAC}/src/libFLAC/metadata_object.c
	${LIBFLAC}/src/libFLAC/stream_decoder.c
	${LIBFLAC}/src/libFLAC/stream_encoder.c
	${LIBFLAC}/src/libFLAC/stream_encoder_framing.c
	${LIBFLAC}/src/libFLAC/stream_encoder_intrin_avx2.c
	${LIBFLAC}/src/libFLAC/stream_encoder_intrin_sse2.c
	${LIBFLAC}/src/libFLAC/stream_encoder_intrin_ssse3.c
	${LIBFLAC}/src/libFLAC/window.c
)

add_library(FLAC::FLAC ALIAS FLAC)

target_compile_definitions(FLAC PRIVATE "-DHAVE_CONFIG_H" PUBLIC "-DFLAC__NO_DLL")
if(MSVC)
	target_compile_options(FLAC PRIVATE "/wd4244" "/wd4267" "/wd4334" "/wd4996")
elseif(MINGW)
	# Needed for non-w64 MinGW
	target_compile_definitions(FLAC PRIVATE "-D__MSVCRT_VERSION__=0x0601")
endif()

target_include_directories(FLAC
PUBLIC
	${LIBFLAC}/include
PRIVATE
	${LIBFLAC}/src/libFLAC/include
	${CMAKE_CURRENT_BINARY_DIR}/include/FLAC/private
)

set(FLAC_LIBRARY FLAC PARENT_SCOPE)
set(FLAC_INCLUDE_DIR "" PARENT_SCOPE)
