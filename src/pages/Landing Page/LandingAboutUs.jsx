import { Box, Container, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { Verified as VerifiedIcon } from '@mui/icons-material';


const LandingAboutUs = () => {

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 30%, #f1f5f9 70%, #ffffff 100%)',
        position: "relative",
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.05) 0%, transparent 40%)
          `,
        }}
      />

      {/* Enhanced Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mb: { xs: 4, md: 5 },
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "800",
              background: 'linear-gradient(135deg, #1e293b 0%, #3b82f6 50%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: "1.8rem", md: "2.2rem" },
              lineHeight: 1.2,
              mb: { xs: 0.5, sm: 1, md: 2 },
              mx: 'auto',
              textAlign: 'center',
            }}
          >
            About VELRA
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              mb: 2,
            }}
          >
            <Box
              sx={{
                width: "60px",
                height: "4px",
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                borderRadius: "2px",
              }}
            />
            <VerifiedIcon sx={{ color: '#3b82f6', fontSize: 24 }} />
            <Box
              sx={{
                width: "60px",
                height: "4px",
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                borderRadius: "2px",
              }}
            />
          </Box>
          <Typography
            variant="subtitle1"
            sx={{
              color: '#64748b',
              fontSize: { xs: '0.9rem', md: '1rem' },
              fontWeight: '500',
              textAlign: 'center',
              maxWidth: { xs: '350px', md: '600px' },
              mx: 'auto',
            }}
          >
            Leading the future of community management with innovation and excellence
          </Typography>
        </Box>
      </motion.div>


      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: { xs: 4, md: 6 },
            }}
          >
            {/* Left Side - Content */}
            <Box sx={{ flex: 1.2, pr: { md: 4 }, px: { xs: 1, sm: 0 } }}>
              {/* Description Content */}
              <Typography
                variant="body1"
                sx={{
                  color: "#475569",
                  fontSize: { xs: "0.85rem", md: "1rem" },
                  lineHeight: 1.7,
                  mb: 3,
                  fontWeight: '400',
                }}
              >
                At VELRA, we specialize in delivering seamless Society and
                Vendor Management solutions tailored to the unique needs of
                residential societies and service providers. With services that
                span across facility management, vendor coordination, and
                resident services, we ensure every interaction is as efficient
                as it is reliable. Our dedicated team leverages advanced
                technology and industry expertise to streamline operations,
                enhance communication, and provide peace of mind for all
                stakeholders involved.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#475569",
                  fontSize: { xs: "0.85rem", md: "1rem" },
                  lineHeight: 1.7,
                  fontWeight: '400',
                }}
              >
                Our commitment goes beyond technology. At VELRA, we strive to
                create management experiences that leave a lasting impression.
                Whether it's residential society management, vendor
                coordination, or a comprehensive service marketplace, we focus
                on fostering meaningful connections and delivering exceptional
                service. Every solution we design is guided by a passion for
                excellence, trust, and a deep understanding of what makes
                community living truly rewarding.
              </Typography>
            </Box>


            {/* Right side - Visual Section */}
            <Box
              sx={{
                flex: 1,
                display: { xs: "none", md: "block" },
                visibility: { xs: "hidden", md: "visible" },
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box sx={{ position: "relative" }}>
                  {/* Top Large Image */}
                  <Box
                    sx={{
                      mb: 2,
                      borderRadius: "16px",
                      overflow: "hidden",
                      height: { xs: "160px", md: "200px" },
                      backgroundColor: "#e2e8f0",
                      backgroundImage:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "white",
                        fontWeight: "600",
                        fontSize: { xs: "0.9rem", md: "1.1rem" },
                        textAlign: "center",
                      }}
                    >
                      Society Management Dashboard
                    </Typography>
                  </Box>

                  <Grid container spacing={2}>
                    {/* Bottom Left Image */}
                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{
                          borderRadius: "16px",
                          overflow: "hidden",
                          height: { xs: "100px", md: "130px" },
                          backgroundColor: "#f1f5f9",
                          backgroundImage:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "white",
                            fontWeight: "600",
                            fontSize: { xs: "0.7rem", md: "0.9rem" },
                            textAlign: "center",
                            px: 1,
                          }}
                        >
                          Service Providers
                        </Typography>
                      </Box>
                    </Grid>

                    {/* Bottom Right - Stats */}
                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{
                          borderRadius: "16px",
                          overflow: "hidden",
                          height: { xs: "100px", md: "130px" },
                          backgroundColor: "#f8fafc",
                          border: "2px solid #e2e8f0",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          p: 2,
                        }}
                      >
                        <Typography
                          variant="h2"
                          sx={{
                            fontWeight: "700",
                            color: "#1e293b",
                            fontSize: { xs: "1.5rem", md: "2.2rem" },
                            lineHeight: 1,
                            mb: 1,
                          }}
                        >
                          100+
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: "600",
                            color: "#64748b",
                            fontSize: { xs: "0.8rem", md: "1rem" },
                            textAlign: "center",
                            lineHeight: 1.2,
                          }}
                        >
                          Societies Served
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </motion.div>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LandingAboutUs;